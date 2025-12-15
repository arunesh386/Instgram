import axios from 'axios';
import React, { use } from 'react'
import { useState, useEffect } from 'react';
function suggestions() {

  const [profile, setProfile] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err));

    fetch('http://localhost:5000/suggestions')
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.log(err));
  }, []);

  const handleFollow = async (id,username) => {
    axios.post('http://localhost:5000/followers', { "id": id, "username": username})
    .then(alert("followed"))
    .catch(err=>console.log(err))
  };

  return (
    <div>
      <div className='suggestions w-75 mt-4 mx-3'>
        {profile ?
          <div className='d-flex '>
            <img className='dp rounded-circle' src={profile.profile_pic} alt="User Profile" />
            <h5>{profile.username}</h5>
            <small className='text-primary ms-auto'>switch</small>
          </div>
          : <p>Loading profile...</p>}

        <div className='d-flex justify-content-between mt-3 mb-2'>
          <h5 className='text-secondary'>Suggestions For You</h5>
          <b className=' ms-auto'>See All</b>
        </div>

        {suggestions.length > 0 ? (
          <div>
            {suggestions.map(suggestion => (
              <div className='my-2' key={suggestion.id}>
                <div className='d-flex'>
                  <img className='dp rounded-circle' src={suggestion.profile_pic} alt="User Profile" />
                  <h5>{suggestion.username}</h5>
                  <button className='btn btn-primary ms-auto' onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</button>

                </div>
              </div>
            ))}

          </div>

        ) : (
          <div>Loading suggestions...</div>
        )}

      </div>

    </div>






  )
}

export default suggestions