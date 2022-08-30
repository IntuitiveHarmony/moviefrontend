import axios from 'axios'
import {useState, useEffect} from 'react'

const apiKey = '5e986ac1b545d3a43184019b017d36f3'

const APIComponent = (props) => {
  let [imageString, setImageString] = useState('https://image.tmdb.org/t/p/w92')
  const [popularMovies, setPopularMovies] = useState([])
  const [newRating, setNewRating] = useState(0)
  let [page, setPage] = useState(1)
  let [newQuery, setNewQuery] = useState('')

  useEffect(()=>{
      axios
          .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
          .then((response)=>{
            console.log(response.data, 'useeffect');

              setPopularMovies(response.data.results)
          })
  }, [])


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

  const handleLoadNextPage = () => {
    setPage(page += 1)
    axios
      .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
      .then((response)=>{
        console.log(response.data);

          setPopularMovies(response.data.results)
      })
  }

  const handleLoadPreviousPage = () => {
    page > 1 ?
    setPage(page -= 1) :
    setPage(1)
    axios
      .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
      .then((response)=>{
          setPopularMovies(response.data.results)
      })
  }

  const handleQueryChange = (e) => {
    console.log(newQuery, 'onchange');
    setNewQuery(e.target.value)
  }

  const handleQueryFormSubmit = () => {
    console.log('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + newQuery)
    axios
      .get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + newQuery)
      .then((response)=>{
          console.log(response.data);
          setPopularMovies(response.data.results)
      })
  }



  return (
    <div>
      <h1>Popular Movies</h1>
      <button onClick={handleLoadPreviousPage}>Previous</button>
      <button onClick={handleLoadNextPage}>Next</button>
      <input type='text' onKeyUp={handleQueryChange}/>
      <button onClick={handleQueryFormSubmit}>Search Button</button>
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


//<input type='submit' value='search' onSubmit={handleQueryFormSubmit}/>
