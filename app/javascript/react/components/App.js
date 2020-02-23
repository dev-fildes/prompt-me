import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PromptIndexContainer from './Index/PromptIndexContainer'
import NewPost from './Form/NewPostForm'
import ProfilePage from './Show/ProfilePage'
import PostShowContainer from './Show/PostShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PromptIndexContainer}/>
        <Route exact path="/new" component={NewPost}/>
        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/profile/:id" component={ProfilePage}/>
        <Route exact path="/posts/:id" component={PostShowContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
