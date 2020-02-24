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
    cancelButton =
      <input
        className="ui right floated tiny button"
        type="button"
        value="Cancel"
        onClick={props.cancelClicked}
      />
}

return (
  <div className="formContainer">
    <form onSubmit={formAction} className="ui form">


      <label>
        Review
      </label>
        <textarea
          name="body"
          rows="2"
          onChange={handleInput} value={review.body}
        />

        <br/>

        <br/>

        <div className="clearfix">
          <input
            className="ui right floated tiny button"
            type="submit"
            value={submitButton} />
            {cancelButton}
          </div>
        </form>
      </div>

    )
  }

  export default ReviewForm;
