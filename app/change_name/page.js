"use client";
import { changeName } from "@/service/signup_service"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/custom_hook_auth";

export default function ChangeName(){

    const [ name , setName ] = useState("")
    const { user } = useAuth()
    const router = useRouter()
    // console.log(user?.user?.id)
    const id = user?.user?.id
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
      Change Name
    </h1>

    <p
      style={{
        textAlign: "center",
        color: "#cccccc",
        marginBottom: "30px",
        lineHeight: "1.7",
      }}
    >
      Enter your new display name below. Your profile will be updated
      immediately after submission.
    </p>

    <form
      onSubmit={submitForm}
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
          New Name
        </label>

        <input
          type="text"
          placeholder="Enter your new name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        Update Name
      </button>
    </form>
  </div>
</div>
        
    )
}