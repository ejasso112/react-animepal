import { useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import FetchedSearchContext from '../../context/FetchedSearchContext'
// Import Custom Component
// import NavFilterSearch from './navFilterSearch'
import NavFilterDropdown from './navFilterDropdown'

//* Filters Nav Component
const NavFilters = () => {
  const fetchedSearchContext = useContext(FetchedSearchContext)
  const { getQueryString, setQueryString } = fetchedSearchContext
  const { animeGenres, animeYear, animeSeason, animeFormat, animeAiringStatus } = fetchedSearchContext
  const { setAnimeGenre, setAnimeYear, setAnimeSeason, setAnimeFormat, setAnimeAiringStatus } = fetchedSearchContext

  const currHistory = useHistory()
  const location = useLocation()
  const queryString = getQueryString()

  useEffect(() => {
    setQueryString(location.search)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    currHistory.push({
      pathname: '/Search',
      search: queryString ? `${queryString}` : '',
    })
  }, [currHistory, queryString])

  // * Render Filters Nav
  return (
    <div className='continer' style={{ display: 'flex' }}>
      {/* <NavFilterSearch title='Search' /> */}
      <NavFilterDropdown title='Genres' content={['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy']} onClick={setAnimeGenre} value={animeGenres[0]} amount={animeGenres.length - 1} multi />
      <NavFilterDropdown title='Year' content={['2021', '2020', '2019', '2018', '2017']} onClick={setAnimeYear} value={animeYear} />
      <NavFilterDropdown title='Season' content={['Winter', 'Summer', 'Spring', 'Fall']} onClick={setAnimeSeason} value={animeSeason} />
      <NavFilterDropdown title='Format' content={['TV', 'Show', 'Movie', 'TV Short', 'Special', 'OVA', 'ONA', 'Music']} onClick={setAnimeFormat} value={animeFormat[0]} amount={animeFormat.length - 1} multi />
      <NavFilterDropdown title='Airing Status' content={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} onClick={setAnimeAiringStatus} value={animeAiringStatus} />
    </div>
  )
}

export default NavFilters
