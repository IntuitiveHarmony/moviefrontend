import axios from 'axios'
import {useState} from 'react'


const MyMovies = (props) => {
const [expand, setExpand] = useState(false)
let [hover, setHover] = useState(false)
  //delete icon ceme from icons8.com
  //-----------------------------------------------
  //        EXPAND FUNCTION
  //-----------------------------------------------
  const handleExpand = () => {
    setExpand(!expand)
    props.setMinimize(true)
  }

  if (props.minimize === true) {
   setExpand(false)
 }
 const minimize = () => {
    setExpand(false)
 }
  return (
    <>
    {expand ?
      <div className='expandedCard' id='expandID' onMouseLeave={minimize}>

        <img onClick={handleExpand} src={props.movie.image} className='expandedCardImg'/>
        <div className='infoTainer'>
        {
          (props.movie.title) ?
          <p className='cardOverview'>{props.movie.title}</p> :
          <p className='cardOverview'>{props.movie.name}</p>
        }
        <p>Release Date: {props.movie.year}</p>
        <p className='info'>{props.movie.overview}</p>
          <div className='cardOpt'>
            <img onClick={(event) => {props.handleDelete(props.movie)}} src='icons8-remove-24.png'/>
            Watched:
            {
              props.movie.watched ?
              <input type='checkbox' checked onChange={(event) => {
                props.handleChangeWatched(props.movie)
              }}/>
                :
              <input type='checkbox' onChange={(event) => {
                props.handleChangeWatched(props.movie)
              }}/>
            }
          </div>
          </div>
        </div>
        :
        hover ?
        <a href='#expandID' onMouseEnter={()=> setHover(true)} onMouseLeave={()=>setHover(false)}><div className='cardHover'>
        <img onClick={handleExpand} src={props.movie.image} />


          <div className='hoverMenu'>


            <div className='checkContainer'>
            Watched:
            {
              props.movie.watched ?
              <input type='checkbox' checked onChange={(event) => {
                props.handleChangeWatched(props.movie)
              }}/>
                :
              <input type='checkbox' onChange={(event) => {
                props.handleChangeWatched(props.movie)
              }}/>
            }

            </div>
            <p onClick={(event) => {props.handleDelete(props.movie)}} className='deleteBtn'>Delete</p>
            <p onClick={handleExpand}>Details</p>
            </div>



        </div></a>

        :
        <a href='#expandID' onMouseEnter={()=> setHover(true)} onMouseLeave={()=>setHover(false)}><div className='not-card'>
        <img onClick={handleExpand} src={props.movie.image} />
        <div className='checkContainer'>
          {
            props.movie.watched ?
            <input type='checkbox' checked onChange={(event) => {
              props.handleChangeWatched(props.movie)
            }}/>
              :
            <input type='checkbox' onChange={(event) => {
              props.handleChangeWatched(props.movie)
            }}/>
          }
        </div>
        </div></a>}
    </>
  )









}


export default MyMovies
