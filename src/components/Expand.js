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
    {expand ?   <div className='card expand'>
        <img onClick={handleExpand} src={props.movie.image} />
          <div className='cardOpt'>
            <img onClick={(event) => {props.handleDelete(props.smovie)}} src='icons8-remove-24.png'/>
          </div>
        </div> : <div className='card'>
        <img onClick={handleExpand} src={props.movie.image} />
          <div className='cardOpt'>
            <img onClick={(event) => {props.handleDelete(props.smovie)}} src='icons8-remove-24.png'/>
          </div>
        </div>}

    </>
  )









}


export default Expand
