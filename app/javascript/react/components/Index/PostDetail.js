import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const PostDetail = (props) => {

  return(
    <Fragment>
      <Link to={`/posts/${props.post.id}`}>
        <div className="formTitle">
          {props.post.title}
        </div>
        <div className="formText">
          {props.post.body}
        </div>
      </Link>
    </Fragment>
  )
}
export default PostDetail
