import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const NewPostForm = (props) => {
  let defaultPost = {
    title: "",
    body: ""
  }

  if (props.editPost) defaultPost = props.post

  const [error, setError] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [editClicked, setEditClicked] = useState(false);
  const [post, setPost] = useState(defaultPost)
  const [prompt, setPrompt] = useState([])

  const handleInput = (event) => {
    setPost({
      ...post,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (props.editPost) {
      props.editPost(post, props.closeEditForm)
    } else {
      addNewPost(post)
    }
  }

  const newPrompt = () => {
    fetch('/api/v1/prompts')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setPrompt(parsedBody.prompt_urls[1])
    })
    .catch(error => console.error(`Error in stash fetch ${error.message}`));
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

  if (editClicked) {
    display = <NewPrompt
      prompt={prompt}
    />
  }

  return(
    <div className="formContainer">
      {error[0]}

      {prompt}
      <button onClick={newPrompt}>new quote</button>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          className="form-control"
          onChange={handleInput}
          value={post.title || ''}
          placeholder="Title (optional)"
        />

        <br/>

        <textarea
          name="body"
          className="form-control"
          id="exampleFormControlTextarea1"
          type="text"
          placeholder="Type something.."
          onChange={handleInput}
          value={post.body}
        />

        <br/>
        <input
          className="newButton"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  )
}

export default NewPostForm
