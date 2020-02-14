import React, { useState, useEffect } from 'react'

import NewPost from '../Form/NewPost'
import PostTile from './PostTile'

const PromptIndexContainer = (props) => {
  const [posts, setPosts] = useState([])
  const [signedInUser, setSignedInUser] = useState(null)

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
      setPosts(parsedBody)
    })
    .catch(error => {
      console.error(`Error in fetch ${error.message}`)
    })
  }, [])


  const postList = posts.map(post => {
    return(
      <PostTile
        key={post.id}
        body={post.body}
        title={post.title}
      />
    )
  })

  return(
    <div>
      {postList}
    </div>
  )
}

export default PromptIndexContainer
