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
  <div>
    <div  style={{
    position: "fixed",
    top: "124px",
    right: "420px",
    zIndex: 9999,
    }}>
      <form onSubmit={searchMovie} >
        <input placeholder="search movies" value={search} onChange={(e)=>searchFunction(e.target.value)} 
         style={{
        width: "260px",
        padding: "10px 15px",
        borderRadius: "20px",
        border: "1px solid #555",
        outline: "none",
        background: "#2a2a2a",
        color: "white",
      }}/>
        <button type="submit" style={{
        width: "80px",
        padding: "10px 15px",
        borderRadius: "20px",
        border: "1px solid #555",
        outline: "none",
        background: "#2a2a2a",
        color: "white",
      }}>Seacrh</button>
      </form>
    </div>
    

  
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5 , 1fr)", gap:"10px"}}>
      {currentMovies.map((movie)=>{
        return(
          <div key={movie.id}>
            <Link href={`/about_movies/${movie.id}`}>
              <img src={movie.primaryImage}  
              style={{
                width: "320px",
                height: "327px",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
              }}/> 
            </Link> 
           
            <h3>{movie.primaryTitle}</h3>
          </div>
        )
      })
      }
    </div>

    {search=="" && (
      <>
        <br/>
        <button onClick={()=>pageFunction(page-1)} style={{width:"49vw" ,height:"5vh"}}>Prev</button>
        <button onClick={()=>pageFunction(page+1)} style={{width:"49vw" ,height:"5vh"}}>Next</button>  
      </>
    )}
  </div>
 )
}