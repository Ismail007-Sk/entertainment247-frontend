import axios from "axios";

// Create Axios Instance
const API = axios.create({
    baseURL: "http://localhost:8000",
    // This tells the browser to attach stored httpCookies with API requests sent to the backend.
    withCredentials: true
});

export default API;

let is_refreshing = false;
// Multiple requests can come together; only one request will hit the endpoint "/refresh_token" 
// Rest of the requests will wait in this array
let waiting_requests = [];

const waiting_room = (error = null) => {
    // By default, if no error is passed, the parameter is null
    waiting_requests.forEach((element) => {
        if (error) {
            element.reject(error);
        } else {
            element.resolve();
        }
    });
    waiting_requests = [];  // Finally, the array is cleaned for new error requests.
};

// All responses reach this and are sent to the frontend. Responses with errors like expired tokens are handled here,
// refreshed, and then resent to the backend server.
API.interceptors.response.use( 
    // As a parameter, successful responses are passed using an arrow function
    (success_response) => success_response,

    // Another parameter for those responses which raise errors, using an async arrow function
    async (error) => {
        const failedRequest = error.config; // Loading the configuration of the error

        
        // Very important: Prevent the interceptor from trying to refresh
        // the refresh_token request itself. Otherwise, if /refresh_token
        // returns 401 (e.g., user is logged out or refresh token expired),
        // it would keep calling /refresh_token forever.
        if (failedRequest.url === "/refresh_token") {
            return Promise.reject(error);
        }

        // initially !failedRequest._retry = !undefined = !false = true 
        if (error.response?.status === 401 && !failedRequest._retry) 
        {
            failedRequest._retry = true; // Every failed request can enter into this if block only once!!

            if (is_refreshing) // initially false
            {
                return new Promise((resolve, reject) => {   
                    // Every other failed request is stored in this array
                    waiting_requests.push({ resolve: () => resolve(API(failedRequest)), reject: reject });
                });
            }
            is_refreshing = true; // Every other failed request won't reach the try/catch; only the 1st request enters try/catch to hit the endpoint

            try {
                // Now when the 1st failed request hits the endpoint and waits for a response, 
                // the JS single thread will manage other failed responses. 
                // The single thread will give them a chance to enter this block: if (error.response?.status === 401 && !failedRequest._retry)
                // Then they will simply be pushed to the array one by one via waiting_requests.push().
                // When they are all pushed and the 1st failed request successfully hits the endpoint and gets the response,
                // the single thread will come back here again!! 
                await API.post("/refresh_token");

                waiting_room(); // This blank parameter means null; it will resolve() all the waiting error requests!

                return API(failedRequest); // It works as Promise.resolve() for the 1st error request
            }
            catch (expired_refreshToken_error) {
                // This catch is only executed if the refresh token itself is also expired!
                waiting_room(expired_refreshToken_error);
                return Promise.reject(expired_refreshToken_error); // Rejects the 1st error request

                // This doesn't guarantee a total fix; different errors (token not created properly, not stored properly) 
                // can exist due to backend issues, and those request responses will hit the interceptor again. 
                // But as those error requests were marked as failedRequest._retry = true,
                // they cannot enter this if condition a 2nd time.
                // So this is how ._retry avoids an infinite loop, and those errors will be permanently rejected by
                // Promise.reject(error) outside the if block.
            } 
            finally {
                // Whatever the conclusion, it will reset the flag
                is_refreshing = false;
            }
        }
    // If refreshing the access token doesn't solve the 401 error
    // (e.g. the new token is invalid, corrupted, or there is another backend issue),
    // the same request would keep entering this interceptor and trying to refresh again,
    // creating an infinite loop.An will never passes the error responce to the original caller (e.g.API.get allGames())
    //
    // failedRequest._retry marks that this request has already been retried once,
    // so it cannot enter the refresh logic again.
    //
    // Finally, Promise.reject(error) stops the retry process and passes the error
    // back to the original caller (e.g. API.get allGames()), where it is handled by the
    // page's catch block.
        
        return Promise.reject(error);
    }
);

/* 
================================================================================
NOTES BASED ON LOCALSTORAGE JWT AUTHENTICATION CONCEPT (Backend Integration)
================================================================================

If a JWT exists in localStorage, attach it to the request.
The interceptor does NOT verify the JWT; it only adds:
    Authorization: Bearer <JWT>

When the request reaches the backend, HTTPBearer extracts the JWT from the Authorization header
and passes it to:
    get_current_user(auth_data: HTTPAuthorizationCredentials = Depends(auth_scheme))

Then the backend verifies whether the JWT is valid.
It can then be used inside:
    check_role(required_role)
using:
    user = Depends(get_current_user)

Finally, the endpoint uses:
    Depends(check_role("user_role"))

This single dependency performs both:
1. JWT Authentication (Who are you?)
2. Role Verification / RBAC (Are you allowed to access this feature?)
*/