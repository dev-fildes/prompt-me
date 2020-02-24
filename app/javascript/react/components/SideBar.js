import React, { Fragment, Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import PromptIndexContainer from './Index/PromptIndexContainer'
import NewPost from './Form/NewPostForm'
import ProfilePage from './Show/ProfilePage'

const SideBar = (props) => {

  return(
    <Fragment>
      <div className="col-auto">
        <div className="sidenav">
          <h1>Sidebar</h1>
          <a href="/users/sign_up">Sign Up</a>

        </div>
      </div>
      <div className="col basicset">
        <Switch>
          <Route exact path="/" component={PromptIndexContainer}/>
          <Route exact path="/new" component={NewPost}/>
          <Route exact path="/profile" component={ProfilePage}/>
          <Route exact path="/profile/:id" component={ProfilePage}/>
        </Switch>
      </div>
    </Fragment>
)
}

export default SideBar
