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
      Login
    </h1>

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
          placeholder="Enter your password"
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
        }}
      >
        Log In
      </button>
    </form>

    <div
      style={{
        marginTop: "25px",
        textAlign: "center",
      }}
    >
      <Link
        href="/forgot_password"
        style={{
          color: "#4da6ff",
          textDecoration: "none",
          fontSize: "15px",
        }}
      >
        Forgot Password?
      </Link>

      <p
        style={{
          marginTop: "20px",
          color: "#ccc",
          fontSize: "15px",
        }}
      >
        Don't have an account?{" "}
        <Link
          href="/signup"
          style={{
            color: "#4da6ff",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Create an account
        </Link>
      </p>
    </div>
  </div>
</div>
    )
}