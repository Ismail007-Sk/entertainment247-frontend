"use client";
import Link from "next/link"
import { useAuth } from "@/hooks/custom_hook_auth";
import { useState } from "react";
// Named export of child
import { ProfileDrawer } from "./profile";




export default function Navbar()
{
    // const [ loggedIn , setLoggedIn ] = useState(false)

    // as we know useEffect required fro fecthing data or API , 
    // useEffect also required for localStorage fecthing ,
    // If we write localstorage outside useEffect to fecth Token or data which is stored 
    // in frontend in will through fatal error !! AS localStorage not part of Backend 
    // useEffect(()=>{
    //     const token =localStorage.getItem("Token")
    //     // Its a smart JS tricks that convert null_value-> False Loaded_value-> True
    //     setLoggedIn(!!token)
    // },[])


    // const { isAuthirized , isLoading } = useAuth()

    const { user , loading} = useAuth()

    const [ Drawer, setDrawer ] = useState(false);

    // console.log(loading);
    if (loading) {

        return null;
    }  




    return(
<div>
  <nav
    style={{
      maxWidth: "1700px",
      margin: "20px auto",
      padding: "15px 30px",
      background: "#1c1c1c",
      borderRadius: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
    }}
  >
    {/* Left Navigation */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "28px",
      }}
    >
      <Link
        href="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        🏠 Home
      </Link>

      <Link
        href="/trend"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        🔥 Trending
      </Link>

      <Link
        href="/genre"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        🎭 Genres
      </Link>

      <Link
        href="/games"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        🎮 Games
      </Link>

      <Link
        href="/about"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        ℹ️ About
      </Link>

      <Link
        href="/contact"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        📞 Contact
      </Link>

      {user?.user?.role === "admin" && (
        <Link
          href="/admin"
          style={{
            color: "#e50914",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          🛠️ Admin
        </Link>
      )}
    </div>

    {/* Right Side */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      {user ? (
        <button
          onClick={() => setDrawer(true)}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "30px",
            background: "#e50914",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          👤 {user.user.name}
        </button>
      ) : (
        <>
          <Link
            href="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Log In
          </Link>

          <Link
            href="/signup"
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              background: "#e50914",
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  </nav>

  <ProfileDrawer
    open={Drawer}
    close={() => setDrawer(false)}
  />
</div>
    )
}







            {/* Below is Ternery condition */}
            {/* (condition)? True:False */}

            {/* { loggedIn ?
            (      // (condition)? True
            <>     
               <Link href="/profile">👤 Profile</Link>
            </>
            )
            :
            (      //(condition)? False
            <>
                <Link href="/login">Log in</Link>
                {" | "}
                <Link href="/signup">Sign up</Link>
            </>
            )} */}