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
        <div>
            <div>
                <h2>1. Existing User Details</h2>
                {/* Using Arrow function as wrapper, Because passing value in useState function */}
                <button onClick={()=>Button_oNoF("users")}>{button.users?"Close":"Open"}</button>
                { button.users && users.map((user)=>(
                    <div key={user.id}>
                        <hr/>
                        <h3>{user.name}</h3>
                        <p>
                            Email: {user.email}
                            <br/>
                            Role: {user.role}  
                        </p>
                        <hr/>
                    </div>
                ))}
            </div>
            <hr/>
            <hr/>
            <div>
                <h2>2. Add Games</h2>
                <button onClick={()=>Button_oNoF("games")}>{button.games?"Close":"Open"}</button>
                { button.games && (
                    <div> 
                        <form onSubmit={SubmitForm}>
                            <label>Name: </label>
                            <input  type="text" placeholder="enter name" value={game_name} onChange={(e)=>AddGame(e.target.value)}/>
                            <br/>
                            <label>Price: </label>
                            <input  type="text" placeholder="enter price" value={price} onChange={(e)=>AddPrice(e.target.value)}/>
                            <br/>
                            <label>Story: </label>
                            <input  type="text" placeholder="describe story" value={story} onChange={(e)=>AddStory(e.target.value)}/>
                            <br/>
                            <button type="submit">Submit</button>
                        </form>
                    
                    </div>

                )}
               
            </div>
            <hr/>
            <hr/>
            <div>
                <h2>3. See User Complains</h2>
                <button onClick={()=>Button_oNoF("issues")}>{button.issues?"Close":"Open"}</button>
                { button.issues && user_issues.map((issue)=>(
                    <div key={issue.id}>
                        <hr/>
                        <p>
                            ID: {issue.id}
                            <br/>
                            USER ID: {issue.user_id}
                             <br/>
                            SUBJECT: {issue.subject}
                             <br/>
                            MESSAGE: {issue.message}
                             <br/>
                            STATUS: {issue.status}
                             <br/>
                            CREATED AT: {issue.created_at}
                            <br/>
                            RESOLVED AT: {issue.solved_at}
                        </p>
                        <hr/>

                    </div>
                ))}
            </div>
            <hr/>
            <hr/>
            <div>
                <h2>4. Mark Resolved Issues</h2>
                <button onClick={()=>Button_oNoF("marked")}>{button.marked?"Close":"Open"}</button>
                { button.marked && (
                    <div> 
                        <form onSubmit={SubmitForm2}>
                            <label>Issue ID: </label>
                            <input  type="number" placeholder="enter id" value={id} onChange={(e)=>setIssueID(e.target.value)}/>
                            <br/>
                            <label>Mark Resolved Issue: </label>
                            <input  type="text" placeholder="type Resolved" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                            <br/>
                            <button type="submit">Submit</button>
                        </form>
                    
                    </div>

                )}
               
            </div>


        </div>
    )
}