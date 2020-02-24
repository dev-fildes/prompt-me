import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom';

import PostShowContainer from '../Show/PostShowContainer'
import ReviewForm from '../Form/ReviewForm'

const ReviewTile = ({ review, user, signedInUser, postId, setPost, }) => {
  let { title, body, rating, id } = review
  const [tileReview, setTileReview] = useState(review)
  const [editClicked, setEditClicked] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [errors, setErrors] = useState([])

  const onEditClick = event => {
    event.preventDefault()
    setEditClicked(true)
  }

  const deleteReview = () => {
    fetch(`/api/v1/posts/${postId}/reviews/${review.id}`, {
      credentials: 'same-origin',
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setPost(parsedBody.post)
      setDeleted(true)
    })
    .catch(error => console.error(`Error in fetch ${error.message}`))
  }

  const saveReview = (formPayload) => {
    fetch(`/api/v1/posts/${postId}/reviews/${review.id}`, {
      credentials: 'same-origin',
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      if (typeof parsedBody === "object" && !Array.isArray(parsedBody)) {
        setTileReview(parsedBody.review)
        setEditClicked(false)
        setErrors([])
        setPost(parsedBody.review.post)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in fetch ${error.message}`))
  }

  let updateDeleteButtons
  if (signedInUser && signedInUser.id === user.id || signedInUser && signedInUser.role === "admin") {
    updateDeleteButtons =
    <div className="ui right floated mini buttons">
      <input
        className="ui compact button"
        onClick={onEditClick}
        value="Edit"
      />
      <div className="or"></div>
      <input
        className="ui compact negative button"
        onClick={deleteReview}
        value="Delete"
      />
    </div>
  }

  let display =
  <div className="ui comments">
    <div className="comment">
      <a className="avatar"><img src={review.user.profile_photo.url} /></a>
      <div className="content">
        <div className="author">{review.user.username}</div>
        <div className="metadata">
          <div>{review.user.created_at}</div>
        </div>
        <div className="text">
          {tileReview.body}
          {updateDeleteButtons}
        </div>
      </div>
    </div>
  </div>

  if (editClicked) {
    let errorList
    if (errors.length > 0) {
      errorList = <ErrorList errors={errors} />
    }
    const cancelClicked = () => {
      setEditClicked(false)
    }
    display =
    <div>
      <ReviewForm
        editReview={tileReview}
        saveReview={saveReview}
        cancelClicked={cancelClicked}
      />
    </div>
  }
  if(deleted){
    display = "Review successfully deleted"
  }

  return(
    <div>
      <div className="formContainer">
        {display}
      </div>
    </div>
  )
}

export default ReviewTile
