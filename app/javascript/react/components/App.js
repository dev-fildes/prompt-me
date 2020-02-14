import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PromptIndexContainer from './Index/PromptIndexContainer'
import NewPost from './Form/NewPost'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PromptIndexContainer}/>
        <Route exact path="/post/new" component={NewPost}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
