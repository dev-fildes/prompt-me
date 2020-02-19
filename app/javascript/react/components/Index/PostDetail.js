import React, { Fragment } from 'react'

const PostDetail = ({post}) => {

  return(
    <Fragment>
    <div className="formTitle">
      {post.title}
    </div>
    <div className="formText">
      {post.body}
    </div>
    </Fragment>
  )
}
export default PostDetail
