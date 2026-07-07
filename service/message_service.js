import API from "@/lib/api";

export const submit_issue = async (data)=>{
    const response = await API.post("/user_message",data) 
    return response.data
}


export const all_issue = async ()=>{
    const response = await API.get("/all_user_issue")
    return response.data
}


export const mark_resolved_issue = async (id,data)=>{
    const response = await API.post(`/mark_resolved_issue/${id}`,data) 
    return response.data
}


