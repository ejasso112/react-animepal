import { createContext } from 'react'

const FetchedSearchContext = createContext({
  animeValues: {},
  setAnimeValues: (values = {}) => {},
})

export default FetchedSearchContext
