import React, {useState} from 'react'
import MovieCard from './MovieCard';


export default function SearchMovies() {

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault();    
    console.log("submitting")

    // const query = "Jurassic Park"
    const url = `https://api.themoviedb.org/3/search/movie?api_key=9ed122b3ab3409821ec27d458605cbf7&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results)
      console.log(data.results)
    }catch(err){
      console.error(err)
    }
  }
  return(
    <>
      <form className='form' onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name: </label>
        <input
          className='input'
          htmlFor="query"
          name="query"
          type="text"
          placeholder='Search movie'
          value={query}
          onChange={((e) => setQuery(e.target.value))}/>
        <button className="button" type="submit">Search</button>
        </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                   <MovieCard
                   movie={movie}
                   key={movie.id}
                   />
                ))}
            </div>    
        </>
    )
}