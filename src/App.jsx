import React from 'react'
import { useEffect, useState } from 'react'
import './index.css'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use' 
import { updateSearchCount, getTrendingMovies } from './appwrite.js'

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
  const [trendingMovies, setTrendingMovies] = useState([]); // Fixed typo in variable name
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Setup debounce with 500ms delay
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500, 
    [searchTerm]
  );

  // Function to load trending movies from Appwrite
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies); // Fixed variable name
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    } 
  }

  // Function to fetch movies from TMDB API
  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {
        const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        
        if (data.Response === 'False') {
          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovies([]);
          return;
        }

        setMovies(data.results || []);

        // Update search count in Appwrite if there are results
        if (query && data.results && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }

    } catch(error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies');
    } finally {
      setLoading(false);
    }
  }

  // Effect to fetch movies when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // Effect to load trending movies once on component mount
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main> 
      <div className='pattern'/>
      <div className="wrapper">
        <header>
          <img src='/hero.png' alt="hero"/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className='all-movies'>
          <h2>All Movies</h2>
          
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App