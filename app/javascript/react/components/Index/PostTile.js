import React, { useState, useEffect, Fragment, Refirec } from 'react';
import { Redirect } from 'react-router-dom'

import NewPostForm from '../Form/NewPostForm';
import PostDetail from './PostDetail';

const PostTile = (props) => {
  const [editClicked, setEditClicked] = useState(false);
  let post = props.post

  const closeEditForm = () => {
    setEditClicked(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure? You will be unable to retrieve it after this, please make sure you have this backed up elsewhere.`)) {
      props.deletePost(post);
    };
  };

  const handleFormDisplay = () => {
    setEditClicked(!editClicked)
  }

  let updateDeleteButtons;
  if (post.currentUser && post.currentUser.id === post.creator || post.currentUser && post.currentUser.admin === true) {
    updateDeleteButtons = <span>
    <input className="deleteButton" onClick={handleDelete} type="submit" value="Delete" />
    <input className="deleteButton" onClick={handleFormDisplay} type="submit" value="Edit" />
    </span>
  }


  let display
  if (post) {
    display = <Fragment>
    <PostDetail post={post} />
    <div className="deleteButtonsep">
    {updateDeleteButtons}
    </div>
    </Fragment>
  }
  if (editClicked) {
    display = <NewPostForm
    handleFormDisplay={handleFormDisplay}
    post={post}
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

export default PostTile;
