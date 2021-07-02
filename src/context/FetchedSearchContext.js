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

  animeYearRange: [NaN, NaN],
  setAnimeYearRange: (leftVal, rightVal) => {},

  animeEpisodesRange: [NaN, NaN],
  setAnimeEpisodesRange: (leftVal, rightVal) => {},

  animeDurationRange: [NaN, NaN],
  setAnimeDurationRange: (leftVal, rightVal) => {},
})

export default FetchedSearchContext
