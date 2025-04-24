import React from 'react'
import { useEffect, useState } from 'react'
import './index.css'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {
        const endpoint = query
        ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?sort_by=popularity`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        
        if (data.Responce === 'False') {
          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovies([]);
          return;
        }

        setMovies(data.results || []);

    } catch(error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies');
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);


  return (
    <main> 
      <div className='pattern'/>
      <div className="wrapper">
        <header>
          <img src='/hero.png' alt="hero"/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          
          {loading ?(
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )
          
          }
        </section>
          
      </div>
    </main>
  )
}

export default App
