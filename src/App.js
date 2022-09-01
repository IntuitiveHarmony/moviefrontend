import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import APIComponent from './components/APIComponent'
import MyMovies from './components/MyMovies'

const App = () => {
  let [movies, setMovies] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState(0)
  const [newWatched, setNewWatched] = useState()
  const [minimize, setMinimize] = useState()


  useEffect(()=>{
      axios
          .get('https://fast-bayou-47205.herokuapp.com/movies')
          .then((response)=>{
              setMovies(response.data.reverse())

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



  const handleDelete = (movieData) => {
    axios
      .delete(`https://fast-bayou-47205.herokuapp.com/movies/${movieData._id}`)
      .then(() => {
        axios
        .get('https://fast-bayou-47205.herokuapp.com/movies')
        .then((response) => {
          setMovies(response.data.reverse())
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
          setMovies(response.data.reverse())
        })
      })
  }


  return (
    <>
    <nav>


      <a href='#home'><i class="fa-solid fa-house"></i></a>
      <img id='tmdb' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' />
      <a href='#search'><i class="fa-solid fa-clapperboard"></i></a>

    </nav>
    <h1 id='home' className='big-title'>My Movies</h1>
      <div className='cardContainer'>
      {movies.map((movie, index) => {
        return (
          <MyMovies key={movie._id} movie={movie} handleDelete={handleDelete} handleChangeWatched={handleChangeWatched} setMinimize={setMinimize}  />
        )
      })}
      </div>
      <APIComponent setMovies={setMovies}/>
      <footer class='position-absolute right-0'>
        <div class="container d-flex justify-content-between">
          <a class='footer-a' href="#"><i class="fa-regular fa-copyright"></i>Company</a>
          <a class='footer-a' >Designed by Tyler and Jason</a>
          <div class="">
            <a class='footer-a' href="https://github.com/tylern16"><i class="fa-brands fa-github"></i></a>
            <a class='footer-a' href="https://www.linkedin.com/in/tylernenninger/"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App;
//-------------------------------------------
//  jason Took out for work on cards
//------------------------------------------
//
// <h1>Movies</h1>
// <table>
//   <thead>
//     <tr>
//       <td>Number</td>
//       <td>Title</td>
//       <td>Image</td>
//       <td>Ranking</td>
//       <td>Watched</td>
//     </tr>
//   </thead>
//   <tbody>
//     {movies.map((movie, index) => {
//       return (
//         <tr key={movie._id} className='tableRow' >
//
//           <td>{index + 1}</td>
//           <td>{movie.title}</td>
//           <td><img src={movie.image} /></td>
//           <td>{movie.rating}</td>
//           <td>
//               {
//                 movie.watched ?
//                 <input type='checkbox' checked onChange={(event) => {
//                   handleChangeWatched(movie)
//                 }}/> :
//                 <input type='checkbox' onChange={(event) => {
//                   handleChangeWatched(movie)
//                 }}/>
//               }
//           </td>
//           <td>
//             <button onClick={(event) => {
//               handleDelete(movie)
//             }}>Remove</button>
//           </td>
//         </tr>
//       )
//     })}
//   </tbody>
// </table>
//------------------------------------------------




















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

//--------------------------ADD MOVIE BUTTON AND FUNCTION
// <details><summary>Add Movie</summary>
//   <form onSubmit={handleNewMovieFormSubmit}>
//     Title: <input type="text" onChange={handleNewTitleChange} /><br/>
//     Genre: <input type="text" onChange={handleNewGenreChange} /><br/>
//     Image: <input type="text" onChange={handleNewImageChange} /><br/>
//     Rating: <input type="number" onChange={handleNewRatingChange} /><br/>
//     Watched: <input type="checkbox" onChange={handleNewWatchedChange} /><br/>
//     <input type="submit" value="Add Movie to List"/>
//   </form>
// </details>
// const handleNewMovieFormSubmit = () => {
//   axios
//     .post(
//       'https://fast-bayou-47205.herokuapp.com/movies',
//       {
//         title: newTitle,
//         genre: newGenre,
//         image: newImage,
//         rating: newRating,
//         watched: newWatched
//       }
//     ).then(() => {
//     axios
//       .get('https://fast-bayou-47205.herokuapp.com/movies')
//       .then((response) => {
//         //console.log(response.data)
//         setMovies(response.data)
//       })
//   })
// }

//UPDATE FUNCTION
// const handleMovieUpdate = (movieData) => {
//   axios
//     .put(
//       `https://fast-bayou-47205.herokuapp.com/movies/${movieData._id}`,
//       {
//         title: newTitle,
//         genre: newGenre,
//         image: newImage,
//         rating: newRating,
//         watched: newWatched
//       }
//     )
//     .then(() => {
//       axios
//       .get('https://fast-bayou-47205.herokuapp.com/movies')
//       .then((response) => {
//         setMovies(response.data)
//       })
//     })
// }
