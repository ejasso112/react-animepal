// Import React Dependancies
import { useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// Import Contexts
import FetchedSearchContext from '../context/FetchedSearchContext'
// Import Custom Components
import NavFilters from '../components/Navs/NavFilters'
import NavTags from '../components/Navs/NavTags'
import NavSort from '../components/Navs/NavSort'
// Import API Fetch
import fetchSearchedPage from '../API/fetchSearch'
// Import Helpers
import { getQueryObject, getQueryString } from '../services/utilities'
// Import Styles
import classes from './Browse.module.scss'

//* Browse Component
const Browse = () => {
  // Getting url history
  const history = useHistory()
  // Getting Context for Fetched Search Anime
  const fetchedSearchContext = useContext(FetchedSearchContext)
  // Getting State for Filter Values
  const { animeValues, setAnimeValues } = { ...fetchedSearchContext }
  // Getting State for Searched Anime
  const { searchedAnime, searchedAnimePage, setSearchedAnime, setSearchedAnimePage } = { ...fetchedSearchContext }

  // Effect that updates Filter Values when location and current anime values dont match
  useEffect(() => {
    const location = decodeURIComponent(history.location.search)
    if (location !== getQueryString(animeValues)) {
      setAnimeValues(getQueryObject(location))
    }
  })

  // Fetch Search Anime
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('here')
      const paramsSearchedAnime = {
        page: searchedAnimePage,
        perPage: 50,
        type: 'ANIME',
        sort: animeValues?.sort && animeValues.sort[0],
        search: animeValues?.search && animeValues.search[0],
        genres: animeValues?.genres,
        seasonYear: animeValues?.year && animeValues.year[0],
        season: animeValues?.season && animeValues.season[0],
        format: animeValues?.format,
        status: animeValues?.status && animeValues.status[0],
        yearRange: animeValues?.yearRange,
        episodeRange: animeValues?.episodeRange,
        durationRange: animeValues?.durationRange,
        hentai: animeValues?.hentai && animeValues.hentai[0],
      }

      fetchSearchedPage(paramsSearchedAnime).then((data) => {
        setSearchedAnime(data)
      })
    }, 600)

    return () => {
      clearTimeout(identifier)
    }
  }, [animeValues, searchedAnimePage, setSearchedAnime, setSearchedAnimePage])

  // Handler to update Filter Values and change search query location onChange trigger
  const onChangeHandler = useCallback(
    (newValues) => {
      const location = history.location.search
      const newQueryString = getQueryString(newValues)
      setSearchedAnimePage(1)
      setAnimeValues(newValues)
      !location && history.push({ pathname: '/Search', search: newQueryString })
      location && history.replace({ pathname: '/Search', search: newQueryString })
    },
    [history, setAnimeValues, setSearchedAnimePage]
  )

  //* Render Browse
  return (
    <main className={classes['container']}>
      <NavFilters onChange={onChangeHandler} />
      <NavTags onChange={onChangeHandler} />
      <NavSort onChange={onChangeHandler} />
    </main>
  )
}

export default Browse
