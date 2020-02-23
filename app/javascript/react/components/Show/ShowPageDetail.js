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
      updateDeleteButtons = <span>
        <input className="deleteButton" onClick={handleDelete} type="submit" value="Delete" />
        <input className="deleteButton" onClick={handleFormDisplay} type="submit" value="Edit" />
      </span>
    }
  }

  let displayEdit
  if (body) {
    displayEdit =
    <Fragment>
      <ShowDetail post={post}/>
      <div className="deleteButtonsep">
        {updateDeleteButtons}
      </div>
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
    <div className="formContainer">
      {displayEdit}
    </div>
  )
}

export default ShowPageDetail
