import React, { Fragment } from 'react'

const ShowDetail = (props) => {
  let post = props.post
  let optionalTitle;

  if(post.title !== null) {
    optionalTitle =  <><h2 className="ui left floated header">
      {post.title}
    </h2>
      <div class="ui clearing divider"></div>
    </>
  }

  return(
    <Fragment>
      {optionalTitle}

      {post.body}
      
    </Fragment>
  )
}

export default ShowDetail
