import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom';

import PromptIndexContainer from '../Index/PromptIndexContainer'
import PostDetail from '../Index/PostDetail'
import ShowPageDetail from './ShowPageDetail'
import ReviewTile from '../Review/ReviewTile'
import ReviewForm from '../Form/ReviewForm'

const PostShowContainer = (props) => {
  const [post, setPost] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [signedInUser, setSignedInUser] = useState(null)
  const [reviews, setReviews] = useState([])
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
      setSignedInUser(parsedBody.post.current_user)
      setReviews(parsedBody.post.reviews)
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

  const reviewList = reviews.map(review => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        user={review.user}
        signedInUser={signedInUser}
        postId={id}
        setPost={setPost}
      />
    )
  })

  const addNewReview = (formPayload, emptyReviewForm) => {
      fetch(`/api/v1/posts/${id}/reviews/`, {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      })
        .then(response => {
          if(response.ok){
            return response.json()
          } else {
            const error = new Error(`${response.status} ${response.statusText}`)
            throw(error)
          }
        })
        .then(parsedBody => {
          if (typeof parsedBody === "object" && !Array.isArray(parsedBody)) {
            setReviews([
              parsedBody.review,
              ...reviews
            ])
            setPost(parsedBody.review.post)
            setErrors([])
            emptyReviewForm()
          } else {
            setErrors(parsedBody)
          }
        })
        .catch(error => console.error(`Error in fetch ${error.message}`))
    }

    let reviewForm

  if(signedInUser) {
    reviewForm = <ReviewForm
      addNewReview={addNewReview}
    />
} else {
  reviewForm =
    <div className="signInPrompt">
      <hr/>
      Please <a href="/users/sign_in">Sign In</a> or <a href="/users/sign_up">Sign Up</a> to leave a review.
    </div>
}

  return(
    <div>
      <ShowPageDetail
        title={post.title}
        body={post.body}
        post={post}
        signedInUser={signedInUser}
        editPost={editPost}
        deletePost={deletePost}
      />
      <h3 className="ui dividing header">Comments</h3>
      {reviewList}
      {reviewForm}
    </div>
  )
}
export default PostShowContainer
