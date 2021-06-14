import { createContext } from 'react'

const FetchedListsContext = createContext({
  featuredAnime: [],
  featuredAnimePage: 1,
  setFeaturedAnime: (list) => {},
  setFeaturedAnimePage: (page) => {},
})

export default FetchedListsContext
