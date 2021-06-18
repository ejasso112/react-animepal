import { useState } from 'react'
import FetchedListsContext from './FetchedListsContext'

const FetchedListsProvider = (props) => {
  const [perPage, setPerPage] = useState(NaN)
  const [featuredAnime, setFeaturedAnime] = useState([])
  const [featuredAnimePage, setFeaturedAnimePage] = useState(1)

  const [trendingAnime, setTrendingAnime] = useState([])
  const [trendingAnimePage, setTrendingAnimePage] = useState(1)
  const [popularAnime, setPopularAnime] = useState([])
  const [popularAnimePage, setPopularAnimePage] = useState(1)
  const [upcomingAnime, setUpcomingAnime] = useState([])
  const [upcomingAnimePage, setUpcomingAnimePage] = useState(1)
  const [topAnime, setTopAnime] = useState([])
  const [topAnimePage, setTopAnimePage] = useState(1)

  const [trendingManga, setTrendingManga] = useState([])
  const [trendingMangaPage, setTrendingMangaPage] = useState(1)
  const [popularManga, setPopularManga] = useState([])
  const [popularMangaPage, setPopularMangaPage] = useState(1)
  const [upcomingManga, setUpcomingManga] = useState([])
  const [upcomingMangaPage, setUpcomingMangaPage] = useState(1)
  const [topManga, setTopManga] = useState([])
  const [topMangaPage, setTopMangaPage] = useState(1)

  const FetchedListsState = {
    perPage: perPage,
    setPerPage: setPerPage,

    featuredAnime: featuredAnime,
    featuredAnimePage: featuredAnimePage,
    setFeaturedAnime: setFeaturedAnime,
    setFeaturedAnimePage: setFeaturedAnimePage,

    trendingAnime: trendingAnime,
    trendingAnimePage: trendingAnimePage,
    setTrendingAnime: setTrendingAnime,
    setTrendingAnimePage: setTrendingAnimePage,

    popularAnime: popularAnime,
    popularAnimePage: popularAnimePage,
    setPopularAnime: setPopularAnime,
    setPopularAnimePage: setPopularAnimePage,

    upcomingAnime: upcomingAnime,
    upcomingAnimePage: upcomingAnimePage,
    setUpcomingAnime: setUpcomingAnime,
    setUpcomingAnimePage: setUpcomingAnimePage,

    topAnime: topAnime,
    topAnimePage: topAnimePage,
    setTopAnime: setTopAnime,
    setTopAnimePage: setTopAnimePage,

    trendingManga: trendingManga,
    trendingMangaPage: trendingMangaPage,
    setTrendingManga: setTrendingManga,
    setTrendingMangaPage: setTrendingMangaPage,

    popularManga: popularManga,
    popularMangaPage: popularMangaPage,
    setPopularManga: setPopularManga,
    setPopularMangaPage: setPopularMangaPage,

    upcomingManga: upcomingManga,
    upcomingMangaPage: upcomingMangaPage,
    setUpcomingManga: setUpcomingManga,
    setUpcomingMangaPage: setUpcomingMangaPage,

    topManga: topManga,
    topMangaPage: topMangaPage,
    setTopManga: setTopManga,
    setTopMangaPage: setTopMangaPage,
  }

  return <FetchedListsContext.Provider value={FetchedListsState}>{props.children}</FetchedListsContext.Provider>
}

export default FetchedListsProvider
