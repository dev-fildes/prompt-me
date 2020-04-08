import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LandingPage from './LandingPage'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
