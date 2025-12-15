// import { useState, useEffect } from 'react'
// import axios from 'axios'

// function Profile() {

//   const [profile, setProfile] = useState(null)

//   useEffect(() => {
//     axios.get('http://localhost:5000/profile')
//       .then(res => {
//         setProfile(res.data)
//       })
//       .catch(error => {
//         console.error('Error fetching profile data:', error)
//       })
//   }, [])

//   const handleUpdateProfile = (e) => {
//     setProfile(prev => ({
//         ...prev,
//         [e.target.name]: e.target.value
//     }))

//     const handleUpdate = async function  () => {
//     axios.put('http://localhost:5000/profile', profile)
//         .then(() => {
//         console.log('Profile updated')
//         })
//         .catch(err => console.log(err))
//         }
//     }
//   return (
//     <div className='m-5'>
//       {profile ? (
//         <div>
//             <img src={profile.profile_pic} alt="Profile Avatar" className='profile rounded-circle' />
//           <h5>{profile.username}</h5>

//             <input type="text" 
//                 value={profile.username}
//                 name="username"
//                 className='form-control my-4'
//                onChange={handleUpdateProfile}
//             />

//             <input type="text" 
//                 name="profile_pic"
//                 value={profile.profile_pic}
//                 className='form-control'
//             />

//             <button className='btn btn-primary mt-4' 

//                 onClick={handleUpdate()}>

//                 Update Profile
//             </button>

//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   )
// }

// export default Profile



import { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {

  const [profile, setProfile] = useState(null)
  const [followers, setFollowers] = useState([])
  const [Unfollow, setUnfollow] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:5000/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.log(err))

    axios.get('http://localhost:5000/followers')
      .then(res => setFollowers(res.data))
      .catch(err => console.log(err))
  }, [Unfollow])

  const handleUpdateProfile = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:5000/profile', profile)
      alert('Profile updated')
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnfollow = async (id) => {
   axios.delete(`http://localhost:5000/followers/${id}`)
  .then(alert("Unfollowed"))
  .then(setUnfollow(!Unfollow))
  .catch(err => console.log(err))
  }

  return (
    <div className='m-5'>

      {profile ? (
        <div>

          <img
            src={profile.profile_pic || "/default.png"}
            alt="Profile Avatar"
            className='profile rounded-circle'
          />

          <h5>{profile.username}</h5>

          <input
            type="text"
            name="username"
            value={profile.username}
            className='form-control my-4'
            onChange={handleUpdateProfile}
          />

          <input
            type="text"
            name="profile_pic"
            value={profile.profile_pic}
            className='form-control'
            onChange={handleUpdateProfile}
          />

          <button
            className='btn btn-primary mt-4'
            onClick={handleUpdate}
          >
            Update Profile
          </button>

        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <hr />

      <h5>Followers</h5>

      {followers.length > 0 ? (
        followers.map(follower => (
          <div key={follower.id} className='d-flex my-3'>
            <p>{follower.username}</p>
            <button
              className='btn btn-primary ms-auto'
              onClick={() =>{handleUnfollow(follower.id)}}
            >
              Unfollow
            </button>
          </div>
        ))
      ) : (
        <p>No followers</p>
      )}

    </div>
  )
}

export default Profile
