"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/service/login_service";
import { sendOtpEmail } from "@/email/otp_email";

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
      const otp = response.otp

      if (response.message === "OTP has been sent successfully.") {

        console.log("entering in blcok")
          await sendOtpEmail(email ,otp);
      }
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
<div
  style={{
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "450px",
      background: "#1c1c1c",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        color: "#e50914",
        marginBottom: "20px",
        fontSize: "2.5rem",
      }}
    >
      Forgot Password
    </h1>

    <p
      style={{
        textAlign: "center",
        color: "#cccccc",
        marginBottom: "30px",
        lineHeight: "1.7",
      }}
    >
      Enter your registered email address below. We'll send you a One-Time
      Password (OTP) to verify your identity and reset your password.
    </p>

    <form
      onSubmit={SubmitFunction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <label
          style={{
            display: "block",
            color: "white",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => emailFunc(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#2a2a2a",
            color: "white",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          background: "#e50914",
          color: "white",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Send OTP
      </button>
    </form>
  </div>
</div>
        
    )

}