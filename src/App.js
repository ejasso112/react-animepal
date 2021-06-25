// Import React Dependancies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Import Context Prooviders
import FetchedListsProvider from './context/FetchedListsProvider'
import FetchedAnimeDetailsProvider from './context/FetchedAnimeDetailsProvider'
// Import Custom Components
import Nav from './components/Navs/Nav'
import Home from './containers/Home'
import Anime from './containers/Anime'
import Manga from './containers/Manga'
import AnimeDetails from './containers/AnimeDetails'

//* App Component
const App = () => {
  //* Render App
  return (
    <Router>
      <Nav />
      <FetchedListsProvider>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />

          <Route
            path='/anime/:id/:name'
            render={(props) => (
              <FetchedAnimeDetailsProvider>
                <AnimeDetails {...props} />
              </FetchedAnimeDetailsProvider>
            )}
          />

          <Route path='/anime' component={Anime} />
          <Route path='/manga' component={Manga} />
        </Switch>
      </FetchedListsProvider>
    </Router>
  )
}

export default App
