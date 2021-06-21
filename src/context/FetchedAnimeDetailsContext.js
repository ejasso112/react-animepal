import { createContext } from 'react'

const FetchedAnimeDetailsContext = createContext({
  animeDetails: [],
  setAnimeDetails: (id) => {},
})

export default FetchedAnimeDetailsContext
