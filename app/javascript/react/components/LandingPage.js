import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PromptIndexContainer from './Index/PromptIndexContainer'
import NewPost from './Form/NewPostForm'
import ProfilePage from './Show/ProfilePage'
import PostShowContainer from './Show/PostShowContainer'

const LandingPage = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [shouldLogout, setShouldLogout] = useState(false)

  useEffect(() => {
    fetch('/api/v1/users/current')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setCurrentUser(parsedBody)
    })
    .catch(error => `Error in fetch ${error.message}`)
  }, [])

  return(
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
export default LandingPage;
