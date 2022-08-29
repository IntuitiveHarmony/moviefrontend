import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import APIComponent from './components/APIComponent'

const apiKey = '5e986ac1b545d3a43184019b017d36f3'

const App = () => {
  const [movies, setMovies] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState(0)
  const [newWatched, setNewWatched] = useState(false)
  const [popularMovies, setPopularMovies] = useState([])


  useEffect(()=>{
      axios
          .get('https://fast-bayou-47205.herokuapp.com/movies')
          .then((response)=>{
              setMovies(response.data)
          })
  },[])

  const handleNewTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleNewGenreChange = (e) => {
    setNewGenre(e.target.value)
  }

  const handleNewImageChange = (e) => {
    setNewImage(e.target.value)
  }

  const handleNewRatingChange = (e) => {
    setNewRating(e.target.value)
  }

  const handleNewWatchedChange = (e) => {
    setNewWatched(e.target.checked)
  }

  const handleNewMovieFormSubmit = () => {
    axios
      .post(
        'https://fast-bayou-47205.herokuapp.com/movies',
        {
          title: newTitle,
          genre: newGenre,
          image: newImage,
          rating: newRating,
          watched: newWatched
        }
      ).then(() => {
      axios
        .get('https://fast-bayou-47205.herokuapp.com/movies')
        .then((response) => {
          console.log(response.data)
          setMovies(response.data)
        })
    })
  }

  const handleMovieUpdate = (movieData) => {
    axios
      .put(
        `https://fast-bayou-47205.herokuapp.com/movies/${movieData._id}`,
        {
          title: newTitle,
          genre: newGenre,
          image: newImage,
          rating: newRating,
          watched: newWatched
        }
      )
      .then(() => {
        axios
        .get('https://fast-bayou-47205.herokuapp.com/movies')
        .then((response) => {
          setMovies(response.data)
        })
      })
  }

  const handleDelete = (movieData) => {
    axios
      .delete(`https://fast-bayou-47205.herokuapp.com/movies/${movieData._id}`)
      .then(() => {
        axios
        .get('https://fast-bayou-47205.herokuapp.com/movies')
        .then((response) => {
          setMovies(response.data)
        })
      })
  }

  const getMovies = () => {
    axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey)
  }

  useEffect(()=>{
      axios
          .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey)
          .then((response)=>{
              setPopularMovies(response.data.results)
          })
  },[])

  return (
    <div>
      <h1>Movies</h1>
      <details><summary>Add Movie</summary>
        <form onSubmit={handleNewMovieFormSubmit}>
          Title: <input type="text" onChange={handleNewTitleChange} /><br/>
          Genre: <input type="text" onChange={handleNewGenreChange} /><br/>
          Image: <input type="text" onChange={handleNewImageChange} /><br/>
          Rating: <input type="number" onChange={handleNewRatingChange} /><br/>
          Watched: <input type="checkbox" onChange={handleNewWatchedChange} /><br/>
          <input type="submit" value="Add Movie to List"/>
        </form>
      </details>
      {movies.map((movie) => {
        return (
          <div className='flex-container'>
            <h2>{movie.title}</h2>
            <p>{movie.genre}</p>
            <img src={movie.image} />
            <details>
            <summary>Edit</summary>
              <form onSubmit={(event) => {
                handleMovieUpdate(movie)
              }}>
                Title: <input type="text" defaultValue={movie.title} onChange={handleNewTitleChange} /><br/>
                Genre: <input type="text" defaultValue={movie.genre} onChange={handleNewGenreChange} /><br/>
                Image: <input type="text" defaultValue={movie.image} onChange={handleNewImageChange} /><br/>
                Rating: <input type="number" defaultValue={movie.rating} onChange={handleNewRatingChange} /><br/>
                Watched:
                {movie.watched ?
                   <input type="checkbox" defaultValue={movie.watched} checked onChange={handleNewWatchedChange} /> :
                   <input type="checkbox" defaultValue={movie.watched} onChange={handleNewWatchedChange} />
                 } <br/>
                <input type="submit" value="Confirm Changes"/>
              </form>
            </details>
            <button onClick={(event) => {
              handleDelete(movie)
            }}>Remove</button>
          </div>
        )
      })}
      <APIComponent popularMovies={popularMovies} setMovies={setMovies}/>
    </div>
  )
}

export default App;
