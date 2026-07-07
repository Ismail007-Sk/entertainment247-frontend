"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/custom_hook_auth";
import { resetVerifiedPassword } from "@/service/change_password_service";
import { useRouter } from "next/navigation";

export default function ChangePassword(){

    const [ newpassword , newpasswordFunc ] = useState("")
    const [ password , passwordFunc ] = useState("")
    const { user } = useAuth()
    const id = user?.user?.id;
    const router = useRouter()

    async function formSumbit(e)
    {
        e.preventDefault()
        if (!id) {
            alert("Please login first.");
            return;
        }
        try{
            if (newpassword !== password) 
            {
                alert("Passwords do not match");
            
            }
            else
            {
                const response = await resetVerifiedPassword(id,{password})
                alert(response.message)
                router.replace("/")
            }
            
        }
        catch(error){
            alert(error.response?.data?.detail || "Not connected to backend")
        }
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <form onSubmit={formSumbit}>
                <label>New Password: </label>
                <input type="password" placeholder="enter current password" value={newpassword} onChange={(e)=>newpasswordFunc(e.target.value)}/>
                <br/>
                <label>Re-enter New Password: </label>
                <input type="password" placeholder="enter current password" value={password} onChange={(e)=>passwordFunc(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>                     
        </div>
    )
}