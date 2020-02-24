import React, { useState, Fragment } from 'react'

import NewPostForm from '../Form/NewPostForm'
import ShowDetail from './ShowDetail'

const ShowPageDetail = ({title, body, post, editPost, deletePost}) => {
  const [editClicked, setEditClicked] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Are you sure? You will be unable to retrieve it after this, please make sure you have this backed up elsewhere.`)) {
      deletePost(post.id);
    };
  };

  const closeEditForm = () => {
    setEditClicked(false)
  }

  const handleFormDisplay = () => {
    setEditClicked(!editClicked)
  }

  let updateDeleteButtons;
  if(post.current_user) {
    if (post.current_user.id === post.user.id || post.current_user.admin === true) {
      updateDeleteButtons =
      <div className="ui small basic right floated buttons">
        <button className="ui icon button" onClick={handleDelete} type="submit" value="Delete"><i aria-hidden="true" className="trash icon"></i></button>
        <button className="ui icon button" onClick={handleFormDisplay} type="submit" value="Edit"><i aria-hidden="true" className="cog icon"></i></button>
      </div>
    }
  }

  let displayEdit
  if (body) {
    displayEdit =
    <Fragment>
      <ShowDetail post={post}  />

      {updateDeleteButtons}

    </Fragment>
  }
  if (editClicked) {
    displayEdit =
    <NewPostForm
      handleFormDisplay={handleFormDisplay}
      post={post}
      editPost={editPost}
      closeEditForm={closeEditForm}
    />
  }

  return(
    <div className="ui segment clearfix">
      {displayEdit}
    </div>
  )
}

export default ShowPageDetail
