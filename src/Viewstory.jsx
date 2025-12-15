// import React, { useState, useEffect, } from 'react'
// import { useParams,Link,useNavigate } from 'react-router-dom'


// function Viewstory() {

//   const { id, tot } = useParams();
 
//   const navigate = useNavigate();

//   const [viewstory, setViewstory] = useState(null);
//   console.log(viewstory);
  

//   const storyId = Number(id)
//   const total = Number(tot)

//    useEffect(() => {
//     if (storyId > total || storyId <= 0) {
//       navigate('/')
//     }
//   }, [storyId, total, navigate])

//   if(id > tot || id <= 0){
//     navigate('/');
//   }
  

//   useEffect(() => {
//     fetch(`http://localhost:5000/stories`)
//       .then(data => data.json())
//       .then(data => setViewstory(data.find(story => story.id === parseInt(id))))
//       .catch(err => console.log(err));
//   }, [storyId]);

//   return (
//     <div>
//       {viewstory ?  <div className='d-flex  align-items-center justify-content-center '>
     
//         <Link  to={`/story/${Number(id) - 1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
        
//         <img className='vh-100 ' src={`/${viewstory.image}`} alt="Story Image" />
       
//         <Link  to={`/story/${Number(id) + 1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
        
        
        
        
//         </div> : <p>Loading...</p>}


//     </div>
//   )
// }

// export default Viewstory

import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function Viewstory() {

  const { id, tot } = useParams()
  const navigate = useNavigate()

  const [viewstory, setViewstory] = useState(null)

  // ✅ Redirect check (numbers used directly, no variables)
  useEffect(() => {
    if (Number(id) > Number(tot) || Number(id) <= 0) {
      navigate('/')
    }
  }, [id, tot, navigate])

  // ✅ Fetch story
  useEffect(() => {
    fetch('http://localhost:5000/stories')
      .then(res => res.json())
      .then(data => {
        const foundStory = data.find(
          story => Number(story.id) === Number(id)
        )
        setViewstory(foundStory)
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <div>
      {viewstory ? (
        <div className="d-flex align-items-center justify-content-center">

          {/* LEFT (UNCHANGED) */}
          <Link to={`/story/${Number(id) - 1}/${tot}`}>
            <i className="bi bi-arrow-left-circle-fill m-2"></i>
          </Link>

          {/* IMAGE */}
          <img
            className="vh-100"
            src={`/${viewstory.image}`}
            alt="Story Image"
          />

          {/* RIGHT (UNCHANGED) */}
          <Link to={`/story/${Number(id) + 1}/${tot}`}>
            <i className="bi bi-arrow-right-circle-fill m-2"></i>
          </Link>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Viewstory
