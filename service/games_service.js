import API from "@/lib/api";


export const allGames = async ()=>{
    const response = await API.get("/game_info")
    return response.data
}


export const getGameByName = async (name) => {
    const response = await API.get(`/game_info/name/${name}`);
    return response.data;
};

export const getGamesLessPrice = async (price) => {
    const response = await API.get(`/game_info/price_less/${price}`);
    return response.data;
};

export const sortGamesAsc = async () => {
    const response = await API.get("/game_info/sort/asc");
    return response.data;
};

export const sortGamesDesc = async () => {
    const response = await API.get("/game_info/sort/desc");
    return response.data;
};

export const groupGamesByPrice = async () => {
    const response = await API.get("/game_info/group/price");
    return response.data;
};