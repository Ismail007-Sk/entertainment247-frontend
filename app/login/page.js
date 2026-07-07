"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/service/login_service";
import Link from "next/link";
import { useAuth } from "@/hooks/custom_hook_auth";

export default function Login(){

    const [ email , emailFunc ] = useState("")
    const [ password , passwordFunc ] = useState("")
    const router = useRouter()
      // object is passes in .Provider so {} is used , its also called object destructuring
    const {Log_in} =useAuth()

    async function SubmitForm(e)
    {
        e.preventDefault()
        // Prevent Auto refresh

        try{
// json format is used, so function parameter inside {} 
// this variable name should be similar to Backend return json{} structre, often like(pydantic model) scheme name.
// ******But its better to run backend fastAPI docs ,see the actaul json structure comming or requesting, 
// from backend and then name useState or use other varible name accordingly

            const response = await loginUser({email,password})
            alert("User logged in successfully")

            // Saving the token as Token , also use Token while accessing it.
            // localStorage.setItem("Token",response.access_token)
            // Log_in(response.access_token) //token passes to Log_in function, In Context folder
            // console.log(response.access_token)

            await Log_in()

            router.replace("/")



        }
        catch(error)
        {
            // ( || ) This is called logical OR operator
                // Means atleast backend connected
                // Yes, error.response is a fixed Axios property.
            alert(error.response?.data?.detail||"Cannot connect to the backend.")
        }
    }


    return(
        <div>

            <form onSubmit={SubmitForm}>
                <div>
                    <label htmlFor="email" >Email: </label>
                    <input type="email" placeholder="@gmai.com" value={email} onChange={(e)=>emailFunc(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" >Password: </label>
                    <input type="password" placeholder="enter password" value={password} onChange={(e)=>passwordFunc(e.target.value)}/>
                </div>
                <button type="submit">Log In</button>
            </form>

            <p>
                <Link href={"/forgot_password"}>Forgot password?</Link>
            </p>
            <p>
                Don't have an account? {""}
                <Link href={"/signup"}>Create an account.</Link>
            </p>

        </div>
    )
}