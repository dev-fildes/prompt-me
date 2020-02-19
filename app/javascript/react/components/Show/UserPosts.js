import React, { Fragment } from 'react'

const UserPosts = (props) => {

  return(
    <Fragment>
    <div className="formTitle">
      {props.title}
    </div>
    <div className="formText">
      {props.body}
    </div>
    </Fragment>
  )
}
export default UserPosts
