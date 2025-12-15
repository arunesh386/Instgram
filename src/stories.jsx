import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

function stories() {

  const [stories,setStories]=useState([]);
  const navigate = useNavigate();

  let tot=0;

  useEffect(()=>{
      fetch("http://localhost:5000/stories")
      .then(data => data.json())
      .then(stories => setStories(stories))
      .catch(err => console.log(err))
  },[]);

  return (
    <div className="story d-flex  gap-3 mt-2">
      <div className='d-none'>

        {tot=stories.length}
      </div>
      
  {stories.length > 0 ? (
   stories.map((story) => (
    <div key={story.id}  onClick={()=>{navigate(`/story/${story.id}/${tot}`)}} >
      <div className='gradient-border'>
        <img className=" story-image rounded-circle" src={story.user.profile_pic} alt="dp"  />
      </div>
      <p className='text-truncate'style={{width:"50px"}} >{story.user.username}</p>
      
    </div>
   ))
  ) : (
    <p>No stories</p>
  )}
</div>
  )
}

export default stories