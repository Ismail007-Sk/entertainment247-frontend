import { movies } from "@/data"
import Link from "next/link";

export default function()
{

    const trending_movies = [...movies].sort(() => Math.random() - 0.5).slice(0, 4);

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
    }}
  >
    🔥 Trending Movies
  </h1>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "35px",
    }}
  >
    {trending_movies.map((movie) => (
      <div
        key={movie.id}
        style={{
          background: "#1c1c1c",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
          transition: "transform .3s ease",
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
                fontSize: "1.3rem",
                color: "white",
                textAlign: "center",
                margin: 0,
                fontWeight: "600",
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