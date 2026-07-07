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
      Change Password
    </h1>

    <p
      style={{
        textAlign: "center",
        color: "#cccccc",
        marginBottom: "30px",
        lineHeight: "1.7",
      }}
    >
      Create a strong new password for your account. Make sure both password
      fields match before submitting.
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
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter your new password"
          value={newpassword}
          onChange={(e) => newpasswordFunc(e.target.value)}
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
          Confirm New Password
        </label>

        <input
          type="password"
          placeholder="Re-enter your new password"
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
          marginTop: "10px",
        }}
      >
        Update Password
      </button>
    </form>
  </div>
</div>
    )
}