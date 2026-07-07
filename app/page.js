"use client";

import { useState,useEffect } from "react";
import { movies } from "@/data";
import Link from "next/link";



export default function Home()
{

  // #################################################################
  // // Collected from RapidApi
  // const url = "https://imdb236.p.rapidapi.com/api/imdb/cast/nm0000190/titles"
  // const options = {
	//   method: 'GET',
	//   headers: {
	// 	'x-rapidapi-key': '89406bf89cmsh9566770aaeb4227p1bc432jsn9448bfd3673b',
	// 	'x-rapidapi-host': 'imdb236.p.rapidapi.com',
	// 	'Content-Type': 'application/json'
  //     }
  //   };
  
  // const [ films , filmFunction] = useState([])
  
  
  // useEffect(()=>{
  //   async function getMovies()
  //   {   
  //       let responce = await fetch(url,options)
  //       let movies = await responce.json()
  //       filmFunction(movies)
  //   }
  //   getMovies()
  // },[])
  // #################################################################

  const [ page , pageFunction ] = useState(1)
  const [ search , searchFunction ] = useState("")
  const [ searchTerm , setSearchTerm ] = useState("")


  const singlePageMovies = 10
  const start = (page - 1)*singlePageMovies
  const end = start + singlePageMovies


  const searchedMovie = movies.filter((movie)=>{
    return movie.primaryTitle.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) 
  })


  // Ternary operator
  const currentMovies = search==""?movies.slice(start,end):searchedMovie

  function searchMovie(e)
  {
    e.preventDefault()
    setSearchTerm(search)
  }
  
 return(
 <div
  style={{
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "20px",
  }}
>
  {/* Search Bar */}
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "35px",
    }}
  >
    <form
      onSubmit={searchMovie}
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => searchFunction(e.target.value)}
        style={{
          width: "350px",
          padding: "12px 18px",
          borderRadius: "30px",
          border: "1px solid #555",
          outline: "none",
          background: "#2a2a2a",
          color: "white",
          fontSize: "16px",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px 25px",
          borderRadius: "30px",
          border: "none",
          background: "#e50914",
          color: "white",
          fontSize: "15px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  </div>

  {/* Movie Grid */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "25px",
    }}
  >
    {currentMovies.map((movie) => (
      <div
        key={movie.id}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href={`/about_movies/${movie.id}`}>
          <img
            src={movie.primaryImage}
            alt={movie.primaryTitle}
            style={{
              width: "100%",
              aspectRatio: "2 / 3",
              objectFit: "cover",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          />
        </Link>

        <h3
          style={{
            marginTop: "12px",
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {movie.primaryTitle}
        </h3>
      </div>
    ))}
  </div>

  {/* Pagination */}
  {search === "" && (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "40px",
      }}
    >
      <button
        onClick={() => pageFunction(page - 1)}
        style={{
          width: "180px",
          height: "50px",
          borderRadius: "8px",
          border: "none",
          background: "#e50914",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Previous
      </button>

      <button
        onClick={() => pageFunction(page + 1)}
        style={{
          width: "180px",
          height: "50px",
          borderRadius: "8px",
          border: "none",
          background: "#e50914",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  )}
</div>
 )
}