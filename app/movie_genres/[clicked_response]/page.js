import { movies } from "@/data"
import Link from "next/link"

export default async function genre_movie({params}){
    const {clicked_response} = await params

const genre_based_movies = movies.filter((movie) =>{
//movie->dictionary    // genres = array type -> lowercasing all elements inside array -> cheking clicked_response.toLowerCase() element includes in array or not
    return movie.genres?.map((g) => g.toLowerCase()).includes(clicked_response.toLowerCase())
}
  
);

    return(
        <div>
            <h2>{clicked_response.toUpperCase()} Movies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5 , 1fr)", gap:"10px"}}>
                {genre_based_movies.map((movie)=>(
                <div key={movie.id}>
                    <Link href={`/about_movies/${movie.id}`}>
                        <img src={movie.primaryImage}   
                        style={{
                                width: "320px",
                                height: "370px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                cursor: "pointer",
                            }}/> 
                    </Link> 
                    <h3>{movie.primaryTitle}</h3>
                </div>
                ))}
            </div>
            
        </div>
    )
}