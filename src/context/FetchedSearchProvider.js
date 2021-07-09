import { useState } from 'react'
import FetchedSearchContext from './FetchedSearchContext'

const FetchedSearchProvider = (props) => {
  const [animeValues, setAnimeValues] = useState({})

  const [searchedAnime, setSearchedAnime] = useState([])
  const [searchedAnimePage, setSearchedAnimePage] = useState(1)

  const FetchedSearchState = {
    animeValues: animeValues,
    setAnimeValues: setAnimeValues,

    searchedAnime: searchedAnime,
    setSearchedAnime: setSearchedAnime,
    searchedAnimePage: searchedAnimePage,
    setSearchedAnimePage: setSearchedAnimePage,
  }

  return <FetchedSearchContext.Provider value={FetchedSearchState}>{props.children}</FetchedSearchContext.Provider>
}

export default FetchedSearchProvider
