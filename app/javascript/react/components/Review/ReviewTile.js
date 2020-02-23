import React, { useState, Fragment } from 'react'

const ReviewTile = ({ review, user, signedInUser, postId, setPost, }) => {
  let { title, body, rating, id } = review
  const [tileReview, setTileReview] = useState(review)
  const [editClicked, setEditClicked] = useState(false)
  const [errors, setErrors] = useState([])

  let display =
  <div>

    <img src={review.user.profile_photo.url} className="reviewerIcon"/>
    <h3>{tileReview.title}</h3>


    <p>{tileReview.body}</p>

</div>


return(
  <div>
    <div className="formContainer">
      {display}
    </div>
  </div>
)
}

export default ReviewTile
