import React from 'react';

const PostsTile = (props) => {

  return(
    <div>
      {props.title}<br/>
      {props.body}
    </div>
  )
}
export default PostsTile
