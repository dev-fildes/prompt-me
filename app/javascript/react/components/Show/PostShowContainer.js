import React, {Fragment, useEffect, useState} from 'react'

import PostDetail from '../Index/PostDetail'

const PostShowContainer = (props) => {
  const [post, setPost] = useState({})
  debugger
  let id = props.match.params.id
  useEffect(() => {
    fetch(`/api/v1/posts/${id}`)
    .then(response => {
      if(response.ok){
        return response
      } else {
        const error = new Error(`${response.status} ${response.statusText}`)
        throw(error)
      }
    })
    .then(parsedBody => parsedBody.json())
    .then(parsedBody => {
      setPost(parsedBody.post)
    })
    .catch(error => {
      console.error(`Error in fetch ${error.message}`)
    })
  }, [])

  return(
    <Fragment>
      <div className="formContainer">
        <PostDetail
          post={post}
        />
      </div>
    </Fragment>
  )
}
export default PostShowContainer
