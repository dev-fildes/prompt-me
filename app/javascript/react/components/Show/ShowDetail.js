import React, { Fragment } from 'react'

const ShowDetail = (props) => {

  let post = props.post
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

export default ShowDetail
