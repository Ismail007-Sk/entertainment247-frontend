import { movies } from "@/data"
import Link from "next/link";

export default function()
{

    const trending_movies = [...movies].sort(() => Math.random() - 0.5).slice(0, 4);

    return(

<div>
  <h1 className="text-3xl font-bold text-center mb-8">
    Trending Movies
  </h1>

  <div
    style={{
      maxWidth: "1400px",
      margin: "40px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "40px",
      }}
    >
      {trending_movies.map((movie) => (
        <div
          key={movie.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Link href={`/about_movies/${movie.id}`}>
            <img
              src={movie.primaryImage}
              alt={movie.primaryTitle}
              style={{
                width: "320px",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            />
          </Link>

          <h3 style={{ marginTop: "12px" }}>
            {movie.primaryTitle}
          </h3>
        </div>
      ))}
    </div>
  </div>
</div>
       
    )
}