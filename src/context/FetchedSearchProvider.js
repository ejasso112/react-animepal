import { useState } from 'react'
import FetchedSearchContext from './FetchedSearchContext'

const FetchedSearchProvider = (props) => {
  const [animeValues, setAnimeValues] = useState({})

  const [searchedAnime, setSearchedAnime] = useState([])
  const [searchedAnimeCurrPage, setSearchedAnimeCurrPage] = useState(1)
  const [searchedAnimePageInfo, setSearchedAnimePageInfo] = useState({ currentPage: 1 })

  const FetchedSearchState = {
    animeValues: animeValues,
    setAnimeValues: setAnimeValues,

    searchedAnime: searchedAnime,
    setSearchedAnime: setSearchedAnime,
    searchedAnimeCurrPage: searchedAnimeCurrPage,
    setSearchedAnimeCurrPage: setSearchedAnimeCurrPage,
    searchedAnimePageInfo: searchedAnimePageInfo,
    setSearchedAnimePageInfo: setSearchedAnimePageInfo,
  }

  return <FetchedSearchContext.Provider value={FetchedSearchState}>{props.children}</FetchedSearchContext.Provider>
}

export default FetchedSearchProvider
