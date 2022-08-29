

const APIComponent = (props) => {
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
            </div>

          )
        })}
      </ul>
    </div>
  )
}

export default APIComponent
