import { createContext } from 'react'

const FetchedListsContext = createContext({
  perPage: NaN,
  setPerPage: (amount) => {},

  featuredAnime: [],
  featuredAnimePage: 1,
  setFeaturedAnime: (list) => {},
  setFeaturedAnimePage: (page) => {},

  trendingAnime: [],
  trendingAnimePage: 1,
  setTrendingAnime: (list) => {},
  setTrendingAnimePage: (page) => {},

  trendingManga: [],
  trendingMangaPage: 1,
  setTrendingManga: (list) => {},
  setTrendingMangaPage: (page) => {},

  topAnime: [],
  topAnimePage: 1,
  setTopAnime: (list) => {},
  setTopAnimePage: (page) => {},

  topManga: [],
  topMangaPage: 1,
  setTopManga: (list) => {},
  setTopMangaPage: (page) => {},
})

export default FetchedListsContext
