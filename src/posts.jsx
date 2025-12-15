import React, { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='d-flex justify-content-center mt-3'>
      {posts.length > 0 ? (
        <div>
            {posts.map(post => (
                <div className='my-3' key={post.id}>
                    <div className='d-flex'>
                        <img className='dp rounded-circle' src={post.user.profile_pic} alt="User Profile"/>
                        <h5>{post.user.username}</h5>
                    </div>
                    <img className='post-image' src={post.image} alt="Post"/>
                    <div>
                      <i className="bi bi-heart"></i>
                      <i className="bi bi-chat"></i>
                      <i className="bi bi-send"></i>
                    </div>
                    <div>
                      <b>{post.likes}Likes</b>
                    </div>
                    <p>{post.caption}</p>
                    

                </div>
            ))}
          
        </div>
          
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}

export default Posts;
