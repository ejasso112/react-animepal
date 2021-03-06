// Import React Dependancies
import { useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// Import Contexts
import FetchedSearchContext from '../context/FetchedSearchContext'
// Import Custom Components
import BlockAnime from '../components/Blocks/BlockAnime'
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
  const { searchedAnime, searchedAnimeCurrPage, searchedAnimePageInfo, setSearchedAnime, setSearchedAnimeCurrPage, setSearchedAnimePageInfo } = { ...fetchedSearchContext }
  const { currentPage, hasNextPage } = { ...searchedAnimePageInfo }
  // Effect that updates Filter Values when location and current anime values dont match
  useEffect(() => {
    const location = decodeURIComponent(history.location.search)

    if (location !== getQueryString(animeValues)) {
      console.log(getQueryObject(location))
      setAnimeValues(getQueryObject(location))
    }
  })

  useEffect(() => {
    if (currentPage === 1) {
      window.scrollTo(0, 0)
    }
  }, [currentPage])

  // Fetch Search Anime
  useEffect(() => {
    const identifier = setTimeout(() => {
      const paramsSearchedAnime = {
        page: searchedAnimeCurrPage,
        perPage: 50,
        type: (animeValues?.type && animeValues.type[0].toUpperCase()) || 'ANIME',
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

      if (searchedAnimeCurrPage === 1)
        fetchSearchedPage(paramsSearchedAnime).then((data) => {
          setSearchedAnime(data.media)
          setSearchedAnimePageInfo(data.pageInfo)
        })
      else {
        if (currentPage !== searchedAnimeCurrPage) {
          fetchSearchedPage(paramsSearchedAnime).then((data) => {
            setSearchedAnime((prevData) => [...prevData, ...data.media])
            setSearchedAnimePageInfo(data.pageInfo)
          })
        }
      }
    }, 600)

    return () => {
      clearTimeout(identifier)
    }
  }, [animeValues, currentPage, searchedAnimeCurrPage, setSearchedAnime, setSearchedAnimeCurrPage, setSearchedAnimePageInfo])

  // Handler to update Filter Values and change search query location onChange trigger
  const onChangeHandler = useCallback(
    (newValues) => {
      const location = history.location.search
      const newQueryString = getQueryString(newValues)
      setSearchedAnimeCurrPage(1)
      setAnimeValues(newValues)
      !location && history.push({ search: newQueryString })
      location && history.replace({ search: newQueryString })
    },
    [history, setAnimeValues, setSearchedAnimeCurrPage]
  )
  //* Render Browse
  return (
    <main className={classes['container']}>
      <NavFilters onChange={onChangeHandler} />
      <NavTags onChange={onChangeHandler} />
      <NavSort onChange={onChangeHandler} />
      <BlockAnime data={searchedAnime} currentPage={currentPage} hasNextPage={hasNextPage} setCurrPage={setSearchedAnimeCurrPage} />
    </main>
  )
}

export default Browse
