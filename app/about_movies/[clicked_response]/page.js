import { movies } from "@/data";

export default async function aboutMovie({params}){

    // "Whatever comes after /blog/, I'll store it in params.clicked_response."
    // ✅ Folder name and params key must match.
    // about/
    //   └── [clicked_response]/
    //             └── page.js
    // const { clicked_response } = await params;

    let {clicked_response} = await params

    let movie_founded = movies.find((movie)=> movie.id===clicked_response)


    if (!movie_founded)
    {
        return <h1>Movie Not Founded</h1>
    }
    return(
        // <div>
        //     <h1>{movie_founded.primaryTitle}</h1>
        //     <h2>About</h2>
        //     <img src={movie_founded.primaryImage} style={{width: "350px",height: "400px"}}></img>
        //     <p>{movie_founded.description}</p>
        // </div>
       <div
  style={{
    maxWidth: "1400px",
    margin: "50px auto",
    padding: "30px",
    display: "flex",
    flexWrap: "wrap",
    gap: "50px",
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
  {/* Movie Poster */}
  <div
    style={{
      flex: "0 0 350px",
    }}
  >
    <img
      src={movie_founded.primaryImage}
      alt={movie_founded.primaryTitle}
      style={{
        width: "100%",
        aspectRatio: "2 / 3",
        objectFit: "cover",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
      }}
    />
  </div>

  {/* Movie Information */}
  <div
    style={{
      flex: "1",
      minWidth: "350px",
      color: "white",
    }}
  >
    <h1
      style={{
        fontSize: "3rem",
        marginBottom: "25px",
        fontWeight: "700",
      }}
    >
      {movie_founded.primaryTitle}
    </h1>

    <hr
      style={{
        border: "none",
        height: "2px",
        background: "#444",
        marginBottom: "30px",
      }}
    />

    <h2
      style={{
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#e50914",
      }}
    >
      Overview
    </h2>

    <p
      style={{
        fontSize: "1.15rem",
        lineHeight: "2",
        textAlign: "justify",
        color: "#d8d8d8",
      }}
    >
      {movie_founded.description || "No description available."}
    </p>

    <div
      style={{
        marginTop: "35px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "18px",
      }}
    >
      <div>
        <strong>Release Year:</strong>
        <br />
        {movie_founded.startYear}
      </div>

      <div>
        <strong>Runtime:</strong>
        <br />
        {movie_founded.runtimeMinutes} Minutes
      </div>

      <div>
        <strong>Rating:</strong>
        <br />
        ⭐ {movie_founded.averageRating}
      </div>

      <div>
        <strong>Genres:</strong>
        <br />
        {movie_founded.genres}
      </div>
    </div>
  </div>
</div>
    )
}