import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const UserPosts = (props) => {
  let optionalTitle;

  if(props.title !== null) {
    optionalTitle =  <><h2 className="ui left floated header">
      {props.title}
    </h2>
    <div className="ui clearing divider"></div>
  </>
}

return(
  <Fragment>
    <Link to={`/posts/${props.id}`}>
      {optionalTitle}

      {props.body}
    </Link>
  </Fragment>
)
}
export default UserPosts
