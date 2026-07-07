"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/service/signup_service";



export default function SignUp()
{

    const [ name , nameFunc ] = useState("")
    const [ email , emailFunc ] = useState("")
    const [ password , passwordFunc ] = useState("")
    const router = useRouter()
// this variable name should be similar to Backend return json{} structre, often like(pydantic model) scheme name.
// ******But its better to run backend fastAPI docs ,see the actaul json structure comming or requesting, 
// from backend and then name useState or use other varible name accordingly
    async function FormResult(e){
        e.preventDefault()

        try{
            const response = await signUp({name,email,password})
            alert(response.message)
            router.push("/login")
        }
        catch(error){
            alert(error.response?.data?.detail||"Not connected to backend")
        }

    }

    return(
        <div>
            <form onSubmit={FormResult}>
                <label htmlFor="text">Name: </label>
                <input type="text" placeholder="enter name" value={name} onChange={(e)=>nameFunc(e.target.value)}/>
                <br/>
                <label htmlFor="text">Email: </label>
                <input type="email" placeholder="@gmail.com" value={email} onChange={(e)=>emailFunc(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="enter password" value={password} onChange={(e)=>passwordFunc(e.target.value)}/>          
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
} 