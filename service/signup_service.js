import API from "@/lib/api";

export const signUp = async(userData)=>{
    const response = await API.post("/signup",userData)
    return response.data 
}

export const changeName = async(id,userData)=>{
    const response = await API.patch(`/signup/${id}`,userData)
    return response.data
}