import { createContext } from 'react'

const FetchedSearchContext = createContext({
  animeValues: {},
  setAnimeValues: (values = {}) => {},

  searchedAnime: [],
  searchedAnimePage: 1,
  setSearchedAnime: (list) => {},
  setSearchedAnimePage: (page) => {},
})

export default FetchedSearchContext
