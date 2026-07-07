import Link from "next/link"

export default function Genre()
{
    const movie_genres = ["Crime","Action","Drama","Comedy","Sci-Fi","Adventure","Biography","Talk Show"]
    return(
        <div>
            <h1>Genre</h1>
            {movie_genres.map((genre)=>(
                <div key={genre}>
                    <hr/>
                    <br/>
                    <Link key={genre} href={`/movie_genres/${genre.toLowerCase().replace(/\s+/g, "-")}`}>
                        <h3>{genre}</h3>
                    </Link>
                    <br/>
                    <hr/>
                </div>
                

            ))}
        </div>
    )
}