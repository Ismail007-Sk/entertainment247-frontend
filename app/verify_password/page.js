"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/custom_hook_auth";
import { verifyPassword } from "@/service/change_password_service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function verfy_current_Password(){

    const [ password , passwordFunc ] = useState("")
    const { user } = useAuth()
    const id = user?.user?.id
    const router = useRouter()

    async function formSumbit(e)
    {
        e.preventDefault()
        try{
            const response = await verifyPassword(id,{password})
            alert(response.message)
            router.replace("/change_password")
        }
        catch(error){
            alert(error.response?.data?.detail || "Not connected to backend")
        }
    }

    return(
        <div>
            <form onSubmit={formSumbit}>
                <label>Current Password: </label>
                <input type="password" placeholder="enter current password" value={password} onChange={(e)=>passwordFunc(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>   
            <Link href="/forgot_password">Forgot password?</Link>                 
        </div>
    )
}