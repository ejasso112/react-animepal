import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './containers/Home/Home'

import './App.scss'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
