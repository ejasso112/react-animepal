// Import React Dependancies
import { useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// Import Contexts
import FetchedSearchContext from '../context/FetchedSearchContext'
// Import Custom Components
// import Search from './AnimeDetails/Search'
import NavFilters from '../components/Navs/NavFilters'
// import NavTags from '../components/Navs/NavTags'
// import NavSort from '../components/Navs/NavSort'
// Import Helpers
import { getQueryObject, getQueryString } from '../services/utilities'
// Import Styles
import classes from './Browse.module.scss'

const Browse = () => {
  const history = useHistory()
  const fetchedSearchContext = useContext(FetchedSearchContext)
  const { animeValues, setAnimeValues } = { ...fetchedSearchContext }

  useEffect(() => {
    const location = decodeURIComponent(history.location.search)
    if (location !== getQueryString(animeValues)) {
      setAnimeValues(getQueryObject(location))
    }
    // JSON.stringify(getQueryObject(location)) !== JSON.stringify(animeValues) && setAnimeValues(getQueryObject(location))
  })

  const onChangeHandler = useCallback(
    (newValues) => {
      const location = history.location.search

      const newQueryString = getQueryString(newValues)
      setAnimeValues(newValues)
      !location && history.push({ pathname: '/Search', search: newQueryString })
      location && history.replace({ pathname: '/Search', search: newQueryString })
    },
    [history, setAnimeValues]
  )
  return (
    <main className={classes['container']} style={{ paddingTop: '6em', margin: '0 2.5%' }}>
      <NavFilters onChange={onChangeHandler} animeValues={animeValues} />
      {/* <NavTags /> */}
      {/* <NavSort /> */}
      {/* <CarouselSlider {...trendingAnimeProps} /> */}

      {/* <Search /> */}
    </main>
  )
}

export default Browse

/*
  const [queryString, setQueryString] = useState({ string: location, action: 'push' })
  const isMount = useIsMount()

  const fetchedSearchContext = useContext(FetchedSearchContext)
  const { animeValues, setAnimeValues } = { ...fetchedSearchContext }
  const newQueryString = getQueryString(animeValues)

  useEffect(() => {
    location !== queryString.string && setAnimeValues(getQueryObject(location))
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    isMount && JSON.stringify(getQueryObject(queryString.string)) !== JSON.stringify(animeValues) && setAnimeValues(getQueryObject(queryString.string))
  }, [isMount, queryString, animeValues, setAnimeValues])

  useEffect(() => {
    if (!isMount && queryString.string !== newQueryString) {
      setQueryString({ string: newQueryString, action: queryString.string ? 'replace' : 'push' })
    }
  }, [isMount, newQueryString, queryString])

  useEffect(() => {
    if (!isMount && JSON.stringify(getQueryObject(queryString.string)) === JSON.stringify(animeValues)) {
      queryString.action === 'replace' && history.replace({ pathname: '/Search', search: queryString.string })
      queryString.action === 'push' && history.push({ pathname: '/Search', search: queryString.string })
    }
  }, [queryString])
*/
