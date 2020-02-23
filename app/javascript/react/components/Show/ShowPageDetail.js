import React, { useState, Fragment } from 'react'

import NewPostForm from '../Form/NewPostForm'
import ShowDetail from './ShowDetail'

const ShowPageDetail = (props) => {
  const [post, setPost] = useState([])
  const [editClicked, setEditClicked] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Are you sure? You will be unable to retrieve it after this, please make sure you have this backed up elsewhere.`)) {
      props.deletePost(props.post.id);
    };
  };

  const closeEditForm = () => {
    setEditClicked(false)
  }

  const handleFormDisplay = () => {
    setEditClicked(!editClicked)
  }

  let updateDeleteButtons;
  if(props.currentUser) {
    if (props.currentUser.id === props.creator || props.currentUser.admin === "true") {
      updateDeleteButtons = <span>
        <input className="deleteButton" onClick={handleDelete} type="submit" value="Delete" />
        <input className="deleteButton" onClick={handleFormDisplay} type="submit" value="Edit" />
      </span>
    }
  }

  let display
  if (props) {
    display =
    <Fragment>
      <ShowDetail post={props.post}/>
      <div className="deleteButtonsep">
        {updateDeleteButtons}
      </div>
    </Fragment>
  }
  if (editClicked) {
    display =
    <NewPostForm
      handleFormDisplay={handleFormDisplay}
      post={props.post}
      editPost={props.editPost}
      closeEditForm={closeEditForm}
    />
  }

  return(
    <div className="formContainer">
      {display}
    </div>
  )
}

export default ShowPageDetail
