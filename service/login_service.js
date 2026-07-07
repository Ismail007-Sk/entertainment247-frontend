import API from "@/lib/api";

// User Login
export const loginUser = async (userData)=>{
    const response = await API.post("/login",userData)
    return response.data
}

// Forgot Password
export const forgotPassword = async (email)=>{
    const response = await API.post("/forgot_password",email)
    return response.data
}

// Reset Password (Tried Different function, rather than arrow function)
export async function resetPassword(resetData){
    const response = await API.post("/reset_password",resetData) 
    return response.data
}