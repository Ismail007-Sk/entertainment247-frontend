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
        <div
  style={{
    maxWidth: "1500px",
    margin: "50px auto",
    padding: "20px",
  }}
>
  <h1
    style={{
      textAlign: "center",
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: "40px",
      color: "white",
      textTransform: "capitalize",
    }}
  >
    🎬 {clicked_response} Movies
  </h1>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "35px",
    }}
  >
    {genre_based_movies.map((movie) => (
      <div
        key={movie.id}
        style={{
          background: "#1c1c1c",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
          transition: "transform 0.3s ease",
        }}
      >
        <Link
          href={`/about_movies/${movie.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src={movie.primaryImage}
            alt={movie.primaryTitle}
            style={{
              width: "100%",
              aspectRatio: "2 / 3",
              objectFit: "cover",
              display: "block",
              cursor: "pointer",
            }}
          />

          <div
            style={{
              padding: "18px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "white",
                fontSize: "1.25rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {movie.primaryTitle}
            </h3>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
    )
}