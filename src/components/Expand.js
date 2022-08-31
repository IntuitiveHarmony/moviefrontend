import axios from 'axios'
import {useState} from 'react'


const Expand = (props) => {
const [expand, setExpand] = useState(false)
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
      <div className='expandedCard'>

        <img onClick={handleExpand} src={props.movie.image} className='expandedCardImg'/>
        <div className='infoTainer'>
        {
          (props.movie.title) ?
          <p className='cardOverview'>{props.movie.title}</p> :
          <p className='cardOverview'>{props.movie.name}</p>
        }
        <p>Realease Date: {props.movie.year}</p>
        <p>{props.movie.overview}</p>

          <div className='cardOpt'>
            <img onClick={(event) => {props.handleDelete(props.movie)}} src='icons8-remove-24.png'/>
            Watched: <input type='checkbox' onChange={(event) => {
              props.handleChangeWatched(props.movie)
            }}/>
          </div>
          </div>
        </div>
        :
        <div className='card'>
        <img onClick={handleExpand} src={props.movie.image} />
          <div className='cardOption'>
            <img onClick={(event) => {props.handleDelete(props.movie)}} src='icons8-remove-24.png' className='delIcon'/>
            <p>{props.movie.rating}</p>
            <input type='checkbox' onChange={(event) => {
              props.handleChangeWatched(props.movie)
            }}/>
          </div>
        </div>}

    </>
  )









}


export default Expand
