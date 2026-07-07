"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/service/login_service";

export default function ForgotPassword(){
  
  const [ email , emailFunc ] = useState("")
  const router = useRouter()

  async function SubmitFunction(e)
  {
    e.preventDefault()
    try{
// this variable name should be similar to Backend return json{} structre, often like(pydantic model) scheme name.
// ******But its better to run backend fastAPI docs ,see the actaul json structure comming or requesting, 
// from backend and then name useState or use other varible name accordingly

      const response = await forgotPassword({email})
      alert(response.message)
      router.push("/reset_password")
    }
    catch(error)
    {
     // Means atleast backend connected
     // Yes, error.response is a fixed Axios property.
      alert(error.response?.data?.detail||"Something went wrong")
    }
    
  }
  
  return(
    <div>

      <form onSubmit={SubmitFunction}>
        <label htmlFor="email">Email: </label>
        <input type="email" placeholder="@gmail.com" value={email} onChange={(e)=>emailFunc(e.target.value)}/>
        <br/>
        <button type="submit">Send OTP</button>
      </form>
                
    </div>
        
    )

}