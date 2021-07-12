import { createContext } from 'react'

const FetchedSearchContext = createContext({
  animeValues: {},
  setAnimeValues: (values = {}) => {},

  searchedAnime: [],
  searchedAnimeCurrPage: 1,
  searchedAnimePageInfo: {},
  setSearchedAnime: (list) => {},
  setSearchedAnimeCurrPage: (page) => {},
  setSearchedAnimePageInfo: (pageInfo) => {},
})

export default FetchedSearchContext
