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
        color: "white",
        marginBottom: "35px",
        fontSize: "2.5rem",
      }}
    >
      Create Account
    </h1>

    <form
      onSubmit={FormResult}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <label
          style={{
            color: "white",
            fontWeight: "600",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => nameFunc(e.target.value)}
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
            color: "white",
            fontWeight: "600",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
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
            color: "white",
            fontWeight: "600",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          value={password}
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
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          background: "#e50914",
          color: "white",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Create Account
      </button>
    </form>
  </div>
</div>
    )
} 