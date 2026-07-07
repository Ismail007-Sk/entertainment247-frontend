import API from "@/lib/api";


export const allUser = async ()=>{
    const response = await API.get("/signup")
    return response.data
}

export const addGames = async (data)=>{
    const response = await API.post("/game_info",data)
    response.data
}