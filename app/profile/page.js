"use client";

import { useAuth } from "@/hooks/custom_hook_auth";
import { useRouter } from "next/navigation";

export default function Profile()
{
    const {Log_out} = useAuth()
    const router = useRouter()
    
    async function handleLogout()
    {
        await Log_out()
        router.replace("/")
    }
    return(
        <div>
            <button onClick={handleLogout}>Log out</button>
  
        </div>
    )
}
