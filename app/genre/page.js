import Link from "next/link"

export default function Genre()
{
    const movie_genres = ["Crime","Action","Drama","Comedy","Sci-Fi","Adventure","Biography","Talk Show"]
    return(
<div
  style={{
    maxWidth: "1200px",
    margin: "50px auto",
    padding: "30px",
    color: "white",
  }}
>
  <h1
    style={{
      textAlign: "center",
      fontSize: "3rem",
      color: "#e50914",
      marginBottom: "40px",
    }}
  >
    🎬 Movie Genres
  </h1>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "25px",
    }}
  >
    {movie_genres.map((genre) => (
      <Link
        key={genre}
        href={`/movie_genres/${genre.toLowerCase().replace(/\s+/g, "-")}`}
        style={{
          textDecoration: "none",
        }}
      >
        <div
          style={{
            background: "#1c1c1c",
            borderRadius: "15px",
            padding: "35px 20px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
            transition: "0.3s ease",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "15px",
            }}
          >
            🎭
          </div>

          <h2
            style={{
              color: "white",
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "600",
            }}
          >
            {genre}
          </h2>

          <p
            style={{
              marginTop: "12px",
              color: "#bdbdbd",
              fontSize: "15px",
            }}
          >
            Browse {genre} movies
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>
    )
}