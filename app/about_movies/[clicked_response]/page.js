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
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "20px",
                display: "flex",
                gap: "40px",
                alignItems: "flex-start",
            }}
            >

            <img
                src={movie_founded.primaryImage}
                alt={movie_founded.primaryTitle}
                style={{
                width: "350px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
            />

                <div style={{ flex: 1 }}>
                        <h1
                        style={{
                            fontSize: "2.5rem",
                            marginBottom: "20px",
                        }}
                        >
                        {movie_founded.primaryTitle}
                        </h1>

                        <h2
                        style={{
                            marginBottom: "15px",
                            color: "#666",
                        }}
                        >
                        About
                        </h2>

                        <p
                        style={{
                            lineHeight: "1.8",
                            fontSize: "1.1rem",
                            textAlign: "justify",
                        }}
                        >
                        {movie_founded.description}
                        </p>
                    
                </div>
            </div>
    )
}