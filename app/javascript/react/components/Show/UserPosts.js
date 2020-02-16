import React from 'react';

const UserPosts = (props) => {

  return(
    <div>
      {props.title}<br/>
      {props.body}
    </div>
  )
}
export default UserPosts
