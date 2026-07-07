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
      Verify Password
    </h1>

    <p
      style={{
        textAlign: "center",
        color: "#cccccc",
        marginBottom: "30px",
        lineHeight: "1.7",
      }}
    >
      For your security, please enter your current password before changing it.
    </p>

    <form
      onSubmit={formSumbit}
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
          Current Password
        </label>

        <input
          type="password"
          placeholder="Enter your current password"
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
        Verify Password
      </button>
    </form>

    <div
      style={{
        textAlign: "center",
        marginTop: "25px",
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
        Forgot your password?
      </Link>
    </div>
  </div>
</div>
    )
}