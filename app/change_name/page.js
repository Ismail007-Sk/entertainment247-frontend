"use client";
import { changeName } from "@/service/signup_service"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/custom_hook_auth";

export default function ChangeName(){

    const [ name , setName ] = useState("")
    const { user } = useAuth()
    const router = useRouter()
    // console.log(user.user.id)
    const id = user.user.id
    console.log(id)

    async function submitForm(e){
        e.preventDefault()
        
        try{
            const response = await changeName(id,{name})
            alert(response.message)
            router.replace("/")
        }
        catch(error){
            alert(error.response?.data?.detail || "Not connected to backend")
        }
    }

    return(

        <div>
            <form onSubmit={submitForm}>
                <label>New Name:</label>
                <input type="text" value={name} placeholder="enter new name" onChange={(e)=>setName(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )
}