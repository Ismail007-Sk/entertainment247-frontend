"use client";
import { useEffect ,useState } from "react";
import { useAuth } from "@/hooks/custom_hook_auth";
import { useRouter } from "next/navigation";
import Link from "next/link";


    // porps can be also passed ProfileDrawer(porps)...value canbe accessed as props.open, props.close 
    // But here we passed direct variable names inside {open , close} called Destructuring.
export function ProfileDrawer({ open , close }){

    const { user , Log_out } = useAuth()
    const router = useRouter()


    // Keeps drawer mounted
    const [visible, setVisible] = useState(open);
    // Closing animation state
    const [closing, setClosing] = useState(false);
     // Show drawer when open becomes true
    useEffect(() => {
        if (open) {
            setVisible(true);
            setClosing(false);
        }
    }, [open]);


    function handleClose() {
        setClosing(true);

        setTimeout(() => {
            setVisible(false);
            setClosing(false);
            close(); // Tell parent to close
        }, 350); // Match CSS animation duration
    }




    // console.log(user?.user?.id)
    // This section open and close drawer from keyboadr response
    useEffect(()=>{
        if (!open) return 
        // console.log("Effect ran..Open true")
        function keyboardResponse(e)
        {
            if (e.key==="Escape")
            {
                handleClose()
            }
        } 
        // useEffect active this event listner, to get response from keyboard
        window.addEventListener("keydown",keyboardResponse)
        // This is called cleaner function mandatory to use to stop addListener, 
        // Stored in react and execute just before new useEffect run again!
        return ()=>{
            window.removeEventListener("keydown",keyboardResponse)
        }

    },[open,close])

    async function log_out()
    {
        await Log_out()
        handleClose();
        close()
        router.replace("/")
    }

    // When open = false; condition satisfies it simply close the drawer
    // if (!open) return null
    if (!visible) return null;


    return(
        <div className="DrawerBody" onClick={handleClose}>
            <div  className={`InnerDrawer ${closing ? "closing" : ""}`} onClick={(e)=>e.stopPropagation()}>
                <h2>{user?.user?.name}</h2>
                <hr />
                <Link href="/change_name">Change Name</Link>
                <br/>
                <Link href="/verify_password">Change Password</Link>
                <button onClick={handleClose}>Close</button>
                <button onClick={log_out}>Log out</button>
            </div>
        </div>

    )

    

}