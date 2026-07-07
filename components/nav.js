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


        <div >
            <nav   style={{
    display: "flex",
    alignItems: "center",
    background: "#1b1b1b",
    padding: "12px 20px",
    gap: "15px",
  }}>

            

            <Link href="/">Home</Link>
            {" | "}
            <Link href="/trend">Trend</Link>
            {" | "}
            <Link href="/genre">Genre</Link>
            {" | "}
            <Link href="/about">about</Link>
            {" | "}
            <Link href="/contact">Contact</Link>
            {" | "}
            <Link href="/games">Games Store</Link>
            {" | "}
            

            { user  ? 
            (
            <>
                <button
                    onClick={() => setDrawer(true)}
                            style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                    >

                            👤 Profile
                </button>
            </>
            )
             : 
            (
            <>
                <Link href="/login">Log in</Link>
                {" | "}
                <Link href="/signup">Sign up</Link>
            
            </>
            )
            }

            { user?.user.role=="admin" && 
            (
                <>
                 {" | "}
                 <Link href="/admin">Admin Panel</Link>
                </>
             
            )
        
            }

            </nav>

            <ProfileDrawer
                open = {Drawer}
                // Toggle function used wrapper function here, 
                // This wrapper function changes every time when Drawer value changes
                close = {()=>setDrawer(false)}
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