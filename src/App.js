import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import APIComponent from './components/APIComponent'

const App = () => {
  const [movies, setMovies] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState(0)
  const [newWatched, setNewWatched] = useState()


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

  const handleChangeWatched = (movieData) => {
    axios
      .put(
        `https://fast-bayou-47205.herokuapp.com/movies/${movieData._id}`,
        {
          watched: !movieData.watched
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
      <table>
        <thead>
          <tr>
            <td>Number</td>
            <td>Title</td>
            <td>Image</td>
            <td>Ranking</td>
            <td>Watched</td>
          </tr>
        </thead>
      {movies.map((movie, index) => {
        return (
          <tr key={movie._id} className='tableRow' >

            <td>{index + 1}</td>
            <td>{movie.title}</td>
            <td><img src={movie.image} /></td>
            <td>{movie.rating}</td>
            <td>
                {
                  movie.watched ?
                  <input type='checkbox' checked onChange={(event) => {
                    handleChangeWatched(movie)
                  }}/> :
                  <input type='checkbox' onChange={(event) => {
                    handleChangeWatched(movie)
                  }}/>
                }
            </td>

            <button onClick={(event) => {
              handleDelete(movie)
            }}>Remove</button>
          </tr>
        )
      })}
      </table>
      <APIComponent setMovies={setMovies}/>
    </div>
  )
}

export default App;


//code graveyyard
// <details>
// <summary>Edit</summary>
//   <form onSubmit={(event) => {
//     handleMovieUpdate(movie)
//   }}>
//     Title: <input type="text" defaultValue={movie.title} onChange={handleNewTitleChange} /><br/>
//     Genre: <input type="text" defaultValue={movie.genre} onChange={handleNewGenreChange} /><br/>
//     Image: <input type="text" defaultValue={movie.image} onChange={handleNewImageChange} /><br/>
//     Rating: <input type="number" defaultValue={movie.rating} onChange={handleNewRatingChange} /><br/>
//     Watched:
//     {movie.watched ?
//        <input type="checkbox" defaultValue={movie.watched} checked onChange={handleNewWatchedChange} /> :
//        <input type="checkbox" defaultValue={movie.watched} onChange={handleNewWatchedChange} />
//      } <br/>
//     <input type="submit" value="Confirm Changes"/>
//   </form>
// </details>
