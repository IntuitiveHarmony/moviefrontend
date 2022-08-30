import axios from 'axios'
import {useState, useEffect} from 'react'
//components

const apiKey = '5e986ac1b545d3a43184019b017d36f3'

const APIComponent = (props) => {
  let [imageString, setImageString] = useState('https://image.tmdb.org/t/p/w500')
  const [suggestedMovies, setSuggestedMovies] = useState([])
  const [newRating, setNewRating] = useState(0)
  let [page, setPage] = useState(1)
  let [newQuery, setNewQuery] = useState('')
  let [selectionOptions, setSelectionOptions] = useState([])
  let [genreID, setGenreID] = useState('popular')
  let [movieListByGenre, setMovieListByGenre] = useState([])
  let [queryPage, setQueryPage] = useState(1)

  useEffect(()=>{
      axios
          .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey)
          .then((response)=>{
            console.log(response.data, 'useeffect');
              setSuggestedMovies(response.data.results)
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
          //console.log(response.data)
          props.setMovies(response.data)
        })
    })
  }

  const handleLoadNextPage = () => {
    setPage(page += 1)
    // axios
    //   .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
    //   .then((response)=>{
    //     //console.log(response.data);
    //     setSuggestedMovies(response.data.results)
    //   })
    genreID === 'popular' ?
    axios
      .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
      .then((response)=>{
        //console.log(response.data);
        setSuggestedMovies(response.data.results)
      })
        :
    genreID === 'topRated' ?
    axios
    .get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US&page=1' + '&page=' + page)
      .then((response)=>{
        setSuggestedMovies(response.data.results)
      })
        :
    axios
      .get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=' + genreID + '&page=' + page)
      .then((response)=>{
        setSuggestedMovies(response.data.results)
      })
  }

  const handleLoadPreviousPage = () => {
    page > 1 ?
    setPage(page -= 1) :
    setPage(1)
    // axios
    //   .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
    //   .then((response)=>{
    //       setSuggestedMovies(response.data.results)
    //   })
    genreID === 'popular' ?
    axios
      .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey + '&page=' + page)
      .then((response)=>{
        //console.log(response.data);
        setSuggestedMovies(response.data.results)
      })
        :
    genreID === 'topRated' ?
    axios
    .get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US&page=1' + '&page=' + page)
      .then((response)=>{
        setSuggestedMovies(response.data.results)
      })
        :
    axios
      .get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=' + genreID + '&page=' + page)
      .then((response)=>{
        setSuggestedMovies(response.data.results)
      })
  }

  //loading genres selectors from API
  useEffect(()=>{
      axios
          .get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US')
          .then((response)=>{
              setSelectionOptions(response.data.genres)
          })
  }, [])

  const handleChangeGenre = (e) => {
    setPage(1)
    console.log(e.target.value, 'target value')
    setGenreID(genreID = e.target.value)
    console.log(genreID, 'genre ID')

    e.target.value === 'popular' ?
    axios
      .get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey)
      .then((response)=>{
        //console.log(response.data);
        setSuggestedMovies(response.data.results)
      })
        :
    e.target.value === 'topRated' ?
    axios
    .get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US&page=1')
      .then((response)=>{
        setSuggestedMovies(response.data.results)
      })
        :
    axios
      .get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=' + genreID)
      .then((response)=>{
        setSuggestedMovies(response.data.results)
      })
      //console.log(suggestedMovies, 'check');
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
          setSuggestedMovies(response.data.results)
      })
  }

  const handleNextQueryResult = () => {
    setQueryPage(queryPage += 1)
    console.log(queryPage);
    axios
      .get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + newQuery + '&page=' + queryPage)
      .then((response)=>{
          console.log(response.data);
          setSuggestedMovies(response.data.results)
      })
  }

  const handlePrevQueryResult = () => {
    queryPage > 1 ?
    setQueryPage(queryPage -= 1) :
    setQueryPage(1)
    console.log(queryPage);
    axios
      .get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + newQuery + '&page=' + queryPage)
      .then((response)=>{
          console.log(response.data);
          setSuggestedMovies(response.data.results)
      })
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <select onChange={handleChangeGenre}>
        <option value='popular'>Popular</option>
        <option value='topRated'>Top-Rated</option>
        {selectionOptions.map((option) => {
          return (
            <option
              key={option._id}
              value={option.id}>{option.name}
            </option>
          )
        })}
      </select><br/><br/>
      <button onClick={handleLoadPreviousPage}>Previous</button>
      <button onClick={handleLoadNextPage}>Next</button><br/><br/>
      <input type='text' onKeyUp={handleQueryChange}/>
      <button onClick={handleQueryFormSubmit}>Search by Title</button><br/>
      <button onClick={handlePrevQueryResult}>Previous Result</button>
      <button onClick={handleNextQueryResult}>Next Result</button>


      <ul>
        {suggestedMovies.map((movie) => {
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
