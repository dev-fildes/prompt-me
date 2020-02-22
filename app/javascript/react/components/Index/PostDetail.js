import React, { Fragment } from 'react'

const PostDetail = (props) => {

  return(
    <Fragment>
      <div className="formTitle">
        {props.post.title}
      </div>
      <div className="formText">
        {props.post.body}
      </div>
    </Fragment>
  )
}
export default PostDetail
