"use client";
import { 
    allGames,
    sortGamesAsc,
    sortGamesDesc,
    getGameByName,
    getGamesLessPrice
 } from "@/service/games_service"
import { useState,useEffect } from "react"
import { useAuth } from "@/hooks/custom_hook_auth"
import { useRouter } from "next/navigation";

export default function AllGames(){

    const [ game_name , setSeacrh ] = useState("")
    const [ price , setPrice ] = useState("500")
    const [ filter , setFilter ] = useState("all")
    const [ games, Loadgames ] = useState([])
    // object is passes in .Provider so {} is used , its also called object destructuring
    const { user, loading } = useAuth();
    const router = useRouter()

    // Page setting
    const [ page , setPage ] = useState(1)

     
    const game_per_page = 11
    const start = ( page - 1)*game_per_page
    const end = start + game_per_page




    // Protected Routes
    useEffect(()=>{
        // true  && true  → true
        // true  && false → false
        // false && true  → false
        // false && false → false
        if(!loading && !user){
            router.replace("/login")
        }
    },[user, loading, router]) // Its called dependency array [] normally this maked useEffect run only once after refresh
    // But when dependency array loaded with variable,  any changes to variable ,like isLoading  , isAuthoized become true->false or false to true
    // Will trigger this useEffect and run again.
    // Important, if varible passed to dependency array then must be used inside useEffect. Better not to use those value which is not related to useEffect . 


    // Fetching The Actaul Game Data
    useEffect(()=>{

        if (!user) return  

        async function get_games()
        {
            try{
                let data
                if (game_name ==="")
                {
                    switch(filter){

                        case "asc": data = await sortGamesAsc()
                                    break
                        case "dsc": data = await sortGamesDesc()
                                    break
                        case "less": data = await getGamesLessPrice(price)
                                    break
                        default: data = await allGames()
                        
                    }
                    Loadgames(data)
                }  
            }
            catch(error)
            {
                alert(error.response?.data?.detail || "Not Connected to Backend")
            } 
        }
        get_games()

    },[user,filter,price])

    // Loading till useEffect Data
    if (loading)
    {
        return(<h3>Loading Page...</h3>)
    }

    
    if (!user)
    {
        return null
    }

    async function submitFrom(e){
        e.preventDefault()
        try{
            const data = await getGameByName(game_name)
            console.log(data)
            Loadgames(data)
        }
        catch(error){
            alert(error.response?.data?.detail || "Not connected to backend")
        }

    }


    const current_games = games.slice(start,end)

    return(
<div
  style={{
    maxWidth: "1400px",
    margin: "50px auto",
    padding: "30px",
    color: "white",
  }}
>
  <h1
    style={{
      textAlign: "center",
      fontSize: "3rem",
      marginBottom: "35px",
      color: "#e50914",
    }}
  >
    🎮 Available Games
  </h1>

  {/* Search & Filter */}
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "35px",
    }}
  >
    <form
      onSubmit={submitFrom}
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Search games..."
        value={game_name}
        onChange={(e) => setSeacrh(e.target.value)}
        style={{
          width: "320px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #555",
          background: "#2a2a2a",
          color: "white",
          fontSize: "16px",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          background: "#e50914",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{
        padding: "12px",
        borderRadius: "8px",
        background: "#2a2a2a",
        color: "white",
        border: "1px solid #555",
      }}
    >
      <option value="all">All Games</option>
      <option value="asc">Price: Low → High</option>
      <option value="dsc">Price: High → Low</option>
      <option value="less">Below Price</option>
    </select>

    {filter === "less" && (
      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "8px",
          background: "#2a2a2a",
          color: "white",
          border: "1px solid #555",
        }}
      >
        <option value="500">₹500</option>
        <option value="1000">₹1000</option>
        <option value="1500">₹1500</option>
        <option value="2000">₹2000</option>
      </select>
    )}
  </div>

  {/* Games Grid */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
      gap: "25px",
    }}
  >
    {current_games.map((game) => (
      <div
        key={game.game_id}
        style={{
          background: "#1c1c1c",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "15px",
          }}
        >
          {game.game_name}
        </h2>

        <p
          style={{
            color: "#e50914",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ₹{game.price}
        </p>

        <p
          style={{
            color: "#d8d8d8",
            lineHeight: "1.8",
            marginTop: "15px",
          }}
        >
          {game.story}
        </p>
      </div>
    ))}
  </div>

  {/* Pagination */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "40px",
    }}
  >
    <button
      onClick={() => setPage(page - 1)}
      style={{
        width: "180px",
        height: "50px",
        border: "none",
        borderRadius: "8px",
        background: "#e50914",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Previous
    </button>

    <button
      onClick={() => setPage(page + 1)}
      style={{
        width: "180px",
        height: "50px",
        border: "none",
        borderRadius: "8px",
        background: "#e50914",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Next
    </button>
  </div>
</div>
    )

    
}










































// "use client";

// import { allGames } from "@/service/games_service";
// import { useState , useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";


// export default function AllGames(){

//     const [ games , gameFunc ] =useState([])
//     const [ authorize , getathurization ] = useState(false)
//     const router = useRouter()


//    
//    // You should not use , localStorage directly in the component body,
//    // Use it inside function , or useEffect .
//    // These are safe because they run only in the browser when the user clicks a button or an event occurs.
//     useEffect(()=>{

//         const token = localStorage.getItem("Token")

//         // If token empty this condition satisfies  
//         if (!token)
//         {
//             router.replace("/login")
//             return // it stops the further useEffect imediately 
//         }


//         async function get_games(){

//             try{

//                 const data = await allGames()
//                 gameFunc(data)
//                 getathurization(true)
//             }
//             catch(error)
//             {
//                 alert(error.response?.data?.detail || "Not connected to backend" )
//             } 
//         }
//         get_games()

//     },[])

//     if (!authorize){
//         return(<h3>Loading....</h3>)
//     }


//     return(
//         <div>

//             <h1>Available Games</h1>

//             {games.map((game)=>(
//                 <div key={game.game_id}>
//                     <hr></hr>
//                     <h3>{game.game_name}</h3>
//                     <h4>Price: {game.price} Rs</h4>
//                     <h4>Story: {game.story}</h4>
//                 </div>
//             ))}

//         </div>
//     )
// }
