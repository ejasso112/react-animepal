import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './containers/Home'
import Anime from './containers/Anime'
import Manga from './containers/Manga'

import FetchedListsProvider from './context/FetchedListsProvider'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <FetchedListsProvider>
          <Route exact path={['/', '/home']} component={Home} />
          <Route path='/anime' component={Anime} />
          <Route path='/manga' component={Manga} />
        </FetchedListsProvider>
      </Switch>
    </Router>
  )
}

export default App
