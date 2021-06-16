import { useState } from 'react'
import FetchedListsContext from './FetchedListsContext'

const FetchedListsProvider = (props) => {
  const [perPage, setPerPage] = useState(NaN)
  const [featuredAnime, setFeaturedAnime] = useState([])
  const [featuredAnimePage, setFeaturedAnimePage] = useState(1)
  const [trendingAnime, setTrendingAnime] = useState([])
  const [trendingAnimePage, setTrendingAnimePage] = useState(1)
  const [trendingManga, setTrendingManga] = useState([])
  const [trendingMangaPage, setTrendingMangaPage] = useState(1)
  const [topAnime, setTopAnime] = useState([])
  const [topAnimePage, setTopAnimePage] = useState(1)
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

    trendingManga: trendingManga,
    trendingMangaPage: trendingMangaPage,
    setTrendingManga: setTrendingManga,
    setTrendingMangaPage: setTrendingMangaPage,

    topAnime: topAnime,
    topAnimePage: topAnimePage,
    setTopAnime: setTopAnime,
    setTopAnimePage: setTopAnimePage,

    topManga: topManga,
    topMangaPage: topMangaPage,
    setTopManga: setTopManga,
    setTopMangaPage: setTopMangaPage,
  }

  return <FetchedListsContext.Provider value={FetchedListsState}>{props.children}</FetchedListsContext.Provider>
}

export default FetchedListsProvider
