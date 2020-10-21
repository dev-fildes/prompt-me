import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const PostDetail = (props) => {


  return(
    <Fragment>

      <div className="item">
     <img src={props.post.user.profile_photo.url} className="user-image"/>
        <div className="content">
          <div className="header">{props.post.title}</div>
          <div className="description">
            {props.post.body}
          </div>  <Link to={`/posts/${props.post.id}`}>
          <div className="extra">
            <button className="ui right floated button">

                Read More

            </button>
            </div>
                    </Link>
          </div>
        </div>

    </Fragment>
  )
}
export default PostDetail
