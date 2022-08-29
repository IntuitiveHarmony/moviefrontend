import axios from 'axios'
import {useState} from 'react'

const APIComponent = (props) => {
  let [imageString, setImageString] = useState('https://image.tmdb.org/t/p/w92')


  const handleAddPopularMovieToList = (movieData) => {
    axios
      .post(
        'https://fast-bayou-47205.herokuapp.com/movies',
        {
          title: movieData.title ? movieData.title : movieData.name,
          genre: 'newGenre',
          image: imageString + movieData.poster_path,
          rating: movieData.vote_average,
          watched: false
        }
      ).then(() => {
      axios
        .get('https://fast-bayou-47205.herokuapp.com/movies')
        .then((response) => {
          console.log(response.data)
          props.setMovies(response.data)
        })
    })
  }



  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {props.popularMovies.map((movie) => {
          return (
            <div>
              {
                (movie.title) ?
                <li>{movie.title}</li> :
                <li>{movie.name}</li>
              }
              <img src={imageString + movie.poster_path}/>
              <button onClick={(event) => {
                handleAddPopularMovieToList(movie)
              }}>Add to List</button>
            </div>

          )
        })}
      </ul>
    </div>
  )
}

export default APIComponent
