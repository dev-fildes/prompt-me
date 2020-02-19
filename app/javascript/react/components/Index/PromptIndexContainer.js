import React, { useState, useEffect } from 'react';

import PostTile from './PostTile';
import NewPostForm from '../Form/NewPostForm';

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


    const deletePost = (payload) => {
      fetch(`/api/v1/posts/${payload.id}`, {
        credentials: 'same-origin',
        method: "DELETE"
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then(parsedBody => {
        let newPosts = posts.filter(post => post.id !== parsedBody.post.id)
        setPosts(newPosts)
      })
      .catch(error => console.error(`Error in post delete fetch ${error.message}`))
    }

    const editPost = (payload, closeEditForm) => {
      fetch(`/api/v1/posts/${payload.id}`, {
        credentials: 'same-origin',
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then(parsedBody => {
        if (!Array.isArray(parsedBody)) {
          const returnedPost = parsedBody.post
          const newPosts = posts.map(post => {
            if (post.id === returnedPost.id) {
              return returnedPost
            } else {
              return post
            }
          })
          setPosts(newPosts)
          closeEditForm()
        } else {
          setErrors(parsedBody)
        }
      })
      .catch(error => console.error(`Error in post patch fetch ${error.message}`))
    }


  const postTiles = posts.map(post => {
    return(
      <PostTile
      key={post.id}
      post={post}
      currentUser={post.currentUser}
      editPost={editPost}
      deletePost={deletePost}
      creator={post.user_id}
      />
    );
  });


  return(
    <div className="posts-index-container">
    {postTiles}

    </div>
  )
}

export default PromptIndexContainer;
