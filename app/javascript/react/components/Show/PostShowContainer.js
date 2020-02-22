import React, { useState, useEffect, Fragment } from 'react'

import PostDetail from '../Index/PostDetail'
import ShowPageDetail from './ShowPageDetail'

const PostShowContainer = (props) => {
  const [post, setPost] = useState({})
  const [editClicked, setEditClicked] = useState(false)
  const [signedInUser, setSignedInUser] = useState(null)

  let id = props.match.params.id
  useEffect(() => {
    fetch(`/api/v1/posts/${id}`)
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        const error = new Error(`${response.status} ${response.statusText}`)
        throw(error)
      }
    })
    .then(parsedBody => {
      debugger
      setSignedInUser(parsedBody.currentUser)
      setPost(parsedBody.posts)
    })
    .catch(error => {
      console.error(`Error in fetch ${error.message}`)
    })
  }, [])

debugger
  return(
    <div className="formContainer">
      <ShowPageDetail
        title={post.title}
        body={post.body}
      />
    </div>
  )
}
export default PostShowContainer
