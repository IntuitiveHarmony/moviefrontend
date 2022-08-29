import axios from 'axios'
import {useState, useEffect} from 'react'

const apiKey = '5e986ac1b545d3a43184019b017d36f3'

const APIComponent = (props) => {
  let [imageString, setImageString] = useState('https://image.tmdb.org/t/p/w92')
  const [popularMovies, setPopularMovies] = useState([])
  const [newRating, setNewRating] = useState(0)

  useEffect(()=>{
      axios
          .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey)
          .then((response)=>{
            console.log(response.data);

              setPopularMovies(response.data.results)
          })
  },[])


  const handleAddPopularMovieToList = (movieData) => {
    axios
      .post(
        'https://fast-bayou-47205.herokuapp.com/movies',
        {
          title: movieData.title ? movieData.title : movieData.name,
          image: imageString + movieData.poster_path,
          rating: Math.round(movieData.vote_average*10)/10,
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
        {popularMovies.map((movie) => {
          return (
            <div key={movie.id}>
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
