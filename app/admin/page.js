"use client";
import { allUser ,addGames } from "@/service/admin_service"
import { useState } from "react"
import { all_issue, mark_resolved_issue } from "@/service/message_service";


export default function Admin(){

    const [ users , LoadUsers ] = useState([])
                                            // Passing Object -> means Dictionary
    const [ button , setButton ] = useState({users:false,games:false,issues:false,marked:false})

    const [ game_name , AddGame ] = useState("")
    const [ price , AddPrice ] = useState("")
    const [ story , AddStory ] = useState("") 

    const [ user_issues , LoadIssue ] = useState([])

    const [ status , setStatus ] = useState("")
    const [ id , setIssueID ] = useState("")
 


    // Form 
    async function SubmitForm(e){
        e.preventDefault()
        try{
            await  addGames({game_name,price,story})
            
            // Clear the form
            AddGame("");
            AddPrice("");
            AddStory("");
        }
        catch(error){
                alert(error.response?.data?.detail || "Not connected to backend")
        }

    }
    // Form 2
    async function SubmitForm2(e){
        e.preventDefault()
        try{
            await  mark_resolved_issue(id,{status})
            // Clear the form
            setIssueID("");
            setStatus("");
        }
        catch(error){
                alert(error.response?.data?.detail || "Not connected to backend")
        }
    }



    // New Smart Button Design!
    async function Button_oNoF(buttonResponse){

        if (buttonResponse==="users" && !button.users)
        {
            try{
                const response = await allUser()
                LoadUsers(response)
            }
            catch(error){
                alert(error.response?.data?.detail || "Not connected to backend")
            }
        }
        if (buttonResponse==="issues" && !button.issues)
        {
            try{
                const response = await all_issue()
                LoadIssue(response)
            }
            catch(error){
                alert(error.response?.data?.detail || "Not connected to backend")
            }
        }
        // passing dictionary so () used in arrow function
        // Using very important concept of JS -> spread operator (eg; ...value)[copies array]
        setButton((prev)=>({
            ...prev,[buttonResponse]:!prev[buttonResponse]
        }))

       
    } 

    

    return(
 <div
  style={{
    maxWidth: "1400px",
    margin: "50px auto",
    padding: "30px",
    color: "white",
  }}
>
    <div
        style={{
            background: "#1c1c1c",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
        }}
    >
        <h2>1. Existing User Details</h2>

        <button
            onClick={() => Button_oNoF("users")}
            style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#e50914",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
            }}
        >
            {button.users ? "Close" : "Open"}
        </button>

        {button.users &&
            users.map((user) => (
                <div
                    key={user.id}
                    style={{
                        background: "#2a2a2a",
                        padding: "20px",
                        borderRadius: "10px",
                        marginTop: "20px",
                    }}
                >
                    <h3>{user.name}</h3>

                    <p>
                        Email: {user.email}
                        <br />
                        Role: {user.role}
                    </p>
                </div>
            ))}
    </div>

    <div
        style={{
            background: "#1c1c1c",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
        }}
    >
        <h2>2. Add Games</h2>

        <button
            onClick={() => Button_oNoF("games")}
            style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#e50914",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
            }}
        >
            {button.games ? "Close" : "Open"}
        </button>

        {button.games && (
            <div style={{ marginTop: "25px" }}>
                <form
                    onSubmit={SubmitForm}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            value={game_name}
                            onChange={(e) => AddGame(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #555",
                                background: "#2a2a2a",
                                color: "white",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            placeholder="enter price"
                            value={price}
                            onChange={(e) => AddPrice(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #555",
                                background: "#2a2a2a",
                                color: "white",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div>
                        <label>Story:</label>
                        <input
                            type="text"
                            placeholder="describe story"
                            value={story}
                            onChange={(e) => AddStory(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #555",
                                background: "#2a2a2a",
                                color: "white",
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
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )}
    </div>

    <div
        style={{
            background: "#1c1c1c",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
        }}
    >
        <h2>3. See User Complains</h2>

        <button
            onClick={() => Button_oNoF("issues")}
            style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#e50914",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
            }}
        >
            {button.issues ? "Close" : "Open"}
        </button>

        {button.issues &&
            user_issues.map((issue) => (
                <div
                    key={issue.id}
                    style={{
                        background: "#2a2a2a",
                        padding: "20px",
                        borderRadius: "10px",
                        marginTop: "20px",
                    }}
                >
                    <p>
                        <strong>ID:</strong> {issue.id}
                        <br />
                        <strong>USER ID:</strong> {issue.user_id}
                        <br />
                        <strong>SUBJECT:</strong> {issue.subject}
                        <br />
                        <strong>MESSAGE:</strong> {issue.message}
                        <br />
                        <strong>STATUS:</strong> {issue.status}
                        <br />
                        <strong>CREATED AT:</strong> {issue.created_at}
                        <br />
                        <strong>RESOLVED AT:</strong> {issue.solved_at}
                    </p>
                </div>
            ))}
    </div>

    <div
        style={{
            background: "#1c1c1c",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
        }}
    >
        <h2>4. Mark Resolved Issues</h2>

        <button
            onClick={() => Button_oNoF("marked")}
            style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#e50914",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
            }}
        >
            {button.marked ? "Close" : "Open"}
        </button>

        {button.marked && (
            <div style={{ marginTop: "25px" }}>
                <form
                    onSubmit={SubmitForm2}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    <div>
                        <label>Issue ID:</label>

                        <input
                            type="number"
                            placeholder="enter id"
                            value={id}
                            onChange={(e) => setIssueID(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #555",
                                background: "#2a2a2a",
                                color: "white",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div>
                        <label>Mark Resolved Issue:</label>

                        <input
                            type="text"
                            placeholder="type Resolved"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #555",
                                background: "#2a2a2a",
                                color: "white",
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
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )}
    </div>
</div>
    )
}