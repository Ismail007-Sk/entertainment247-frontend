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
      maxWidth: "500px",
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
      Reset Password
    </h1>

    <p
      style={{
        textAlign: "center",
        color: "#cccccc",
        marginBottom: "30px",
        lineHeight: "1.7",
      }}
    >
      Enter your registered email, the OTP you received, and choose a new
      password.
    </p>

    <form
      onSubmit={SubmitForm}
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

      <div>
        <label
          style={{
            display: "block",
            color: "white",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          OTP
        </label>

        <input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => otpFunc(e.target.value)}
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

      <div>
        <label
          style={{
            display: "block",
            color: "white",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          New Password
        </label>

        <input
          type="password"
          placeholder="Create a new password"
          value={new_password}
          onChange={(e) => passwordFunc(e.target.value)}
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
          padding: "15px",
          border: "none",
          borderRadius: "8px",
          background: "#e50914",
          color: "white",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Reset Password
      </button>
    </form>
  </div>
</div>
    )
}
