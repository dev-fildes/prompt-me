import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const NewPost = (props) => {
  const [error, setError] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [post, setPost] = useState({})
  const emptyReview = {
    title: "",
    body: ""
  }

  const handleInput = (event) => {
    setPost({
      ...post,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let emptyReviewForm = () => {
      setPost(emptyReview)
    }
    addNewPost(post, emptyReviewForm)
  }

  const addNewPost = (formPayload, emptyReviewForm) => {
    fetch(`/api/v1/posts`, {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      if (parsedBody.body === null) {
        setError(parsedBody.error)
        emptyReviewForm()
      } else {
        setPost(parsedBody)
        setShouldRedirect(true)
      }
    })
    .catch(error => console.log(`Error posting ${error.message}`))
  }
  if(shouldRedirect) {
    return <Redirect to="/" />
  }


  return(
    <div className="newPostContainer">
      {error}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          onChange={handleInput}
          value={post.title || ''}
          placeholder="Title (optional)"
          />

        <br/>

        <textarea
          name="body"
          type="text"
          onChange={handleInput}
          value={post.body}
          />

        <br/>
        <input
          type="submit"
          value="Submit"
          />
      </form>
    </div>
  )
}

export default NewPost
