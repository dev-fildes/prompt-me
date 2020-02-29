import React, { Fragment } from 'react'

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
        {optionalTitle}

        {props.body}

      </Fragment>
  )
}
export default UserPosts
