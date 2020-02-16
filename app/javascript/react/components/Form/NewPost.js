import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const NewPost = (props) => {
  const [error, setError] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [post, setPost] = useState({
    title: "",
    body: ""
  })

  const handleInput = (event) => {
    setPost({
      ...post,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewPost(post)
  }

  const addNewPost = (formPayload) => {
    fetch('/api/v1/posts', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formPayload),
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
    })
    .then(response => response.json())
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        setPost(parsedBody)
        setShouldRedirect(true)
      } else {
        setError(parsedBody)
      }
    })
    .catch(error => console.log(`Error posting ${error.message}`))
  }
  if(shouldRedirect) {
    return <Redirect to="/" />
  }

  return(
    <div className="newPostContainer">
      {error[0]}
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
