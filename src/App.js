import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
require('dotenv').config()
const MONGODB_URI  = process.env.MONGODB_URI




const App = () => {
  const [movies, setMovies] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState(0)
  const [newWatched, setNewWatched] = useState(false)

  useEffect(()=>{
      axios
          .get(MONGODB_URI + '/movies')
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
    console.log(newTitle)
    console.log(MONGODB_URI)

    axios
      .post(
        MONGODB_URI + '/movies',
        {
          title: newTitle,
          genre: newGenre,
          image: newImage,
          rating: newRating,
          watched: newWatched
        }
      ).then(() => {
      axios
        .get(MONGODB_URI + '/movies')
        .then((response) => {
          console.log(response.data)
          setMovies(response.data)
        })
    })
  }

  const handleMovieUpdate = (movieData) => {
    axios
      .put(
        `http://localhost:3000/movies/${movieData._id}`,
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
        .get('http://localhost:3000/movies')
        .then((response) => {
          setMovies(response.data)
        })
      })
  }

  const handleDelete = (movieData) => {
    axios
      .delete(`http://localhost:3000/movies/${movieData._id}`)
      .then(() => {
        axios
        .get('http://localhost:3000/movies')
        .then((response) => {
          setMovies(response.data)
        })
      })
  }

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
    </div>
  )
}

export default App;
