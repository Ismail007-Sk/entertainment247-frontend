"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/service/login_service";

export default function ResetPassword(){

    const [ email , emailFunc] = useState("")
    const [ otp , otpFunc] = useState("")
    const [ new_password , passwordFunc] = useState("")
    const router = useRouter()


    async function SubmitForm(e){

        e.preventDefault()

        try{
// this variable name should be similar to Backend return json{} structre, often like(pydantic model) scheme name.
// ******But its better to run backend fastAPI docs ,see the actaul json structure comming or requesting, 
// from backend and then name useState or use other varible name accordingly

            const reset_data = await resetPassword({email,otp,new_password})

            alert(reset_data.message)

            router.push("/")
        }
        catch(error)
        {
            alert(error.response?.data?.detail||"Reset failed")
        }
        
    }

    return(
        <div>
            <form onSubmit={SubmitForm}>
                <label>Email: </label>
                <input type="email" placeholder="@gmail.com" value={email} onChange={(e)=>emailFunc(e.target.value)}/>
                <br/>
                <label>OTP: </label>
                <input type="number" placeholder="enter OTP"  value={otp} onChange={(e)=>otpFunc(e.target.value)}/>
                <br/>
                <label>New Password:</label>
                <input type="password" placeholder="enter new password"  value={new_password} onChange={(e=>passwordFunc(e.target.value))}/>
                <br/>
                <button type="submit">Reset Password</button>
            </form>

        </div>
    )
}
