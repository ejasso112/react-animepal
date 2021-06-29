import { createContext } from 'react'

const FetchedSearchContext = createContext({
  getQueryString: () => {},
  setQueryString: () => {},

  animeGenres: [],
  setAnimeGenre: (genre) => {},

  animeYear: '',
  setAnimeYear: (year) => {},

  animeSeason: '',
  setAnimeSeason: (season) => {},

  animeFormat: '',
  setAnimeFormat: (format) => {},

  animeAiringStatus: '',
  setAnimeAiringStatus: (status) => {},
})

export default FetchedSearchContext
