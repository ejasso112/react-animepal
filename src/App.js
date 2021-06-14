import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './containers/Home/Home'

import FetchedListsProvider from './context/FetchedListsProvider'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route>
          <FetchedListsProvider>
            <Home />
          </FetchedListsProvider>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
