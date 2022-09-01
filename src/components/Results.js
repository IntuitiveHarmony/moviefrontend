import axios from 'axios'
import {useState} from 'react'


const Results = (props) => {
  let [imageString, setImageString] = useState('https://image.tmdb.org/t/p/w500')
  const [expand, setExpand] = useState(false)
  let [hover, setHover] = useState(false)
  //delete icon ceme from icons8.com
  //-----------------------------------------------
  //        EXPAND FUNCTION
  //-----------------------------------------------
  const handleExpand = () => {
    setExpand(!expand)
  }


  return (
    <>

    {expand ?
      <div className='expandedCard' id='expandID'>

        <img onClick={handleExpand} src={imageString + props.movie.poster_path} className='expandedCardImg'/>
        <div className='infoTainer'>
        {
          (props.movie.title) ?
          <p className='cardOverview'>{props.movie.title}</p> :
          <p className='cardOverview'>{props.movie.name}</p>
        }
        <p>Realease Date: {props.movie.year}</p>
        <p className='info'>{props.movie.overview}</p>

          <div className='cardOpt'>
            <img onClick={(event) => {props.handleDelete(props.movie)}} src='icons8-remove-24.png'/>
            Watched: <input type='checkbox' onChange={(event) => {
              props.handleChangeWatched(props.movie)
            }}/>
          </div>
          </div>
        </div>
        :
        hover ?
        <a href='#expandID' onMouseEnter={()=> setHover(true)} onMouseLeave={()=>setHover(false)}><div className='cardHover' >
          <img src={imageString + props.movie.poster_path} />


          <div className='hoverMenu'>
            <p onClick={(event) => {
              props.handleAddPopularMovieToList(props.movie)
              }}>+ My Movies</p>
            <p onClick={handleExpand}>Overview</p>


          </div>




          </div></a>
          :
        <a href='#expandID' onMouseEnter={()=> setHover(true)} onMouseLeave={()=>setHover(false)}><div className='card' >
        <img onClick={handleExpand} src={imageString + props.movie.poster_path} />
          <div className='cardOption'>
          </div>
        </div></a>}

    </>
  )









}

export default Results
