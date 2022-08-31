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
      <div className='card expand'>
        <img onClick={handleExpand} src={props.movie.image} className='cardImg'/>
        {
          (props.movie.title) ?
          <li>{props.movie.title}</li> :
          <li>{props.movie.name}</li>
        }
          <div className='cardOpt'>
            <img onClick={(event) => {props.handleDelete(props.movie)}} src='icons8-remove-24.png'/>
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
