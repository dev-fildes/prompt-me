import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom';

import PromptIndexContainer from '../Index/PromptIndexContainer'
import PostDetail from '../Index/PostDetail'
import ShowPageDetail from './ShowPageDetail'

const PostShowContainer = (props) => {
  const [post, setPost] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState([])

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
      setPost(parsedBody.post)
    })
    .catch(error => {
      console.error(`Error in fetch ${error.message}`)
    })
  }, [])

  const deletePost = (payload) => {
    fetch(`/api/v1/posts/${payload}`, {
      credentials: 'same-origin',
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setPost(parsedBody.post)
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in post delete fetch ${error.message}`))
  }
  if(shouldRedirect) {
    return <Redirect to="/" />
  }

  const editPost = (payload, closeEditForm) => {
    fetch(`/api/v1/posts/${payload.id}`, {
      credentials: 'same-origin',
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      if (typeof parsedBody === "object" && !Array.isArray(parsedBody)) {
        setPost(parsedBody.post)
      } else {
        setErrors(parsedBody)
      }
      closeEditForm()
    })
    .catch(error => console.error(`Error in post patch fetch ${error.message}`))
  }

  return(
    <div>
      <ShowPageDetail
        title={post.title}
        body={post.body}
        currentUser={post.current_user}
        creator={post.user_id}
        post={post}
        editPost={editPost}
        deletePost={deletePost}
      />
    </div>
  )
}
export default PostShowContainer
