import API from "@/lib/api";

export const verifyPassword = async(id,password_data)=>{
    const response = await API.post(`/verify_password/${id}`,password_data)
    return response.data
}

export const resetVerifiedPassword = async(id,password_data)=>{
    const response = await API.post(`/reset_verified_password/${id}`,password_data)
    return response.data
}