import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './containers/Home/Home'
import Anime from './containers/Anime/Anime'

import FetchedListsProvider from './context/FetchedListsProvider'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <FetchedListsProvider>
          <Route path='/anime'>
            <Anime />
          </Route>
          <Route path={('/', '/home')}>
            <Home />
          </Route>
        </FetchedListsProvider>
      </Switch>
    </Router>
  )
}

export default App
