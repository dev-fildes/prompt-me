import React, { useState, useEffect } from 'react';

import NewPostForm from '../Form/NewPostForm';
import PostDetail from './PostDetail';

const PromptIndexContainer = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch('/api/v1/posts')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setPosts(parsedBody.posts)
    })
    .catch(error => console.error(`Error in stash fetch ${error.message}`));
  }, []);


  const postTiles = posts.map(post => {
    return(
      <PostDetail
        key={post.id}
        post={post}
      />
    );
  });


  return(
    <div className="formContainer">
      {postTiles}
    </div>
  )
}

export default PromptIndexContainer;
