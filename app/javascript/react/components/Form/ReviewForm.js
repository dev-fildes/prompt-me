import React, { useState, useEffect } from 'react'

const ReviewForm = (props) => {
  const emptyReview = {
    body: ""
  }

  const [review, setReview] = useState(emptyReview)


  const handleInput = (event) => {
    setReview({
      ...review,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let emptyReviewForm = () => {
      setReview(emptyReview)
    }
    props.addNewReview(review, emptyReviewForm)
  }

  const handleSave = (event) => {
    event.preventDefault()

    props.saveReview(review)
  }

  let formAction = handleSubmit
  let submitButton = "Submit Review"
  let cancelButton
  if (props.editReview) {
    submitButton = "Save"
    formAction = handleSave
    cancelButton = <input
      type="button"
      value="Cancel"
      onClick={props.cancelClicked}
    />
  }

  return (
    <div>
      <form onSubmit={formAction}>

        <label>
          Review
          <textarea name="body" onChange={handleInput} value={review.body} />
        </label>

        <input className="button" type="submit" value={submitButton} />
        {cancelButton}

      </form>
    </div>
  )
}

export default ReviewForm;
