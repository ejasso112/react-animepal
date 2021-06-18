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

  popularAnime: [],
  popularAnimePage: 1,
  setPopularAnime: (list) => {},
  setPopularAnimePage: (page) => {},

  upcomingAnime: [],
  upcomingAnimePage: 1,
  setUpcomingAnime: (list) => {},
  setUpcomingAnimePage: (page) => {},

  topAnime: [],
  topAnimePage: 1,
  setTopAnime: (list) => {},
  setTopAnimePage: (page) => {},

  trendingManga: [],
  trendingMangaPage: 1,
  setTrendingManga: (list) => {},
  setTrendingMangaPage: (page) => {},

  popularManga: [],
  popularMangaPage: 1,
  setPopularManga: (list) => {},
  setPopularMangaPage: (page) => {},

  upcomingManga: [],
  upcomingMangaPage: 1,
  setUpcomingManga: (list) => {},
  setUpcomingMangaPage: (page) => {},

  topManga: [],
  topMangaPage: 1,
  setTopManga: (list) => {},
  setTopMangaPage: (page) => {},
})

export default FetchedListsContext
