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
<div
  className="DrawerBody"
  onClick={handleClose}
  style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 999,
  }}
>
  <div
    className={`InnerDrawer ${closing ? "closing" : ""}`}
    onClick={(e) => e.stopPropagation()}
    style={{
      width: "350px",
      height: "100vh",
      background: "#1c1c1c",
      padding: "35px 25px",
      boxShadow: "-8px 0 20px rgba(0,0,0,0.5)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Profile */}
    <div
      style={{
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "#e50914",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "0 auto 15px",
          color: "white",
        }}
      >
        {user?.user?.name?.charAt(0).toUpperCase()}
      </div>

      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        {user?.user?.name}
      </h2>

      <p
        style={{
          color: "#999",
          marginTop: "8px",
        }}
      >
        Welcome back 👋
      </p>
    </div>

    <hr
      style={{
        border: "1px solid #333",
        marginBottom: "25px",
      }}
    />

    {/* Menu */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        flex: 1,
      }}
    >
      <Link
        href="/change_name"
        style={{
          padding: "14px",
          borderRadius: "8px",
          background: "#2a2a2a",
          color: "white",
          textDecoration: "none",
        }}
      >
        ✏️ Change Name
      </Link>

      <Link
        href="/verify_password"
        style={{
          padding: "14px",
          borderRadius: "8px",
          background: "#2a2a2a",
          color: "white",
          textDecoration: "none",
        }}
      >
        🔒 Change Password
      </Link>
    </div>

    {/* Bottom Buttons */}
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "30px",
      }}
    >
      <button
        onClick={handleClose}
        style={{
          flex: 1,
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          background: "#555",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Close
      </button>

      <button
        onClick={log_out}
        style={{
          flex: 1,
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          background: "#e50914",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Log Out
      </button>
    </div>
  </div>
</div>

    )

    

}