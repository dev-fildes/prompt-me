import React, { useState, useEffect } from 'react';

import UserPosts from './UserPosts'

const ProfilePage = (props) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])

  const id = props.match.params.id
  useEffect(() => {
    fetch(`/api/v1/posts`)
    .then(response => {
      if(response.ok){
        return response.json()
      } else {
        const error = new Error(`${response.status} ${response.statusText}`)
        throw(error)
      }
    })
    .then(parsedBody => {
      let parsed = parsedBody.posts
      let userPosts = [];
      parsed.forEach((post) => {
        if (post.user_id == props.match.params.id) {
          userPosts.push(post);
        };
      });
      setPosts(userPosts);
    })
    .catch(error => {
      console.error(`Error in fetch ${error.message}`)
    })
  }, [])

  const userProfilePosts = posts.map(post => {
    return(
      <UserPosts
        key={post.id}
        body={post.body}
        title={post.title}
        />
    )
  })

  return(
    <div>
      {userProfilePosts}
    </div>
  )
}

export default ProfilePage
