// Import React Dependencies
import { useContext, useEffect, useRef } from 'react'
// Import Contexts
import FetchedListsContext from '../../context/FetchedListsContext'
// Import Custom Components
import Banner from '../../components/Banner/Banner'
import Carousel from '../../components/Carousel/Carousel'
// Import API Fetch
import fetchFeatured from '../../API/fetchFeatured'
import fetchAnimePage from '../../API/fetchAnimePage'
// Import Helpers
import { getYear, getSeason } from '../../services/utilities'

const Home = () => {
  // Getting Context for Fetched Anime Lists
  const fetchedListsContext = useContext(FetchedListsContext)
  // Getting State for Featured Anime List
  const { perPage, setPerPage } = fetchedListsContext
  // Getting State for Featured Anime List
  const { featuredAnime, featuredAnimePage, setFeaturedAnime, setFeaturedAnimePage } = fetchedListsContext
  // Getting State for Trending Anime List
  const { trendingAnime, trendingAnimePage, setTrendingAnime, setTrendingAnimePage } = fetchedListsContext
  // Getting State for Trending Manga List
  const { trendingManga, trendingMangaPage, setTrendingManga, setTrendingMangaPage } = fetchedListsContext
  // Getting State for All Time Popular Anime List
  const { topAnime, topAnimePage, setTopAnime, setTopAnimePage } = fetchedListsContext
  // Getting State for All Time Popular Manga List
  const { topManga, topMangaPage, setTopManga, setTopMangaPage } = fetchedListsContext

  const targetRef = useRef()
  const currYear = getYear()
  const currSeason = getSeason()

  // Resize Handler for Calculating Carousel Items Per Page
  useEffect(() => {
    const resizeHandler = () => {
      if (targetRef.current) {
        const itemWidth = 256
        const itemGap = 8

        const totalItems = Math.floor(targetRef.current.offsetWidth / (itemWidth + itemGap))
        totalItems !== perPage && totalItems <= 10 && setPerPage(totalItems)
      }
    }
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [perPage, setPerPage])

  // Fetch Featured Anime List
  useEffect(() => {
    if (featuredAnime.length === 0) {
      const paramsFeaturedAnime = {
        page: 1,
        perPage: 5,
        type: 'ANIME',
        sort: 'POPULARITY_DESC',
        season: currSeason,
        seasonYear: currYear,
      }

      fetchFeatured(paramsFeaturedAnime).then((data) => {
        setFeaturedAnime(data)
      })
    }
  }, [currSeason, currYear, featuredAnime, setFeaturedAnime])

  // Fetch Trending Anime List
  useEffect(() => {
    if (trendingAnime.length === 0) {
      const paramsTrendingAnime = {
        page: 1,
        perPage: 50,
        type: 'ANIME',
        sort: 'TRENDING_DESC',
      }

      fetchAnimePage(paramsTrendingAnime).then((data) => {
        setTrendingAnime(data)
      })
    }
  }, [trendingAnime, setTrendingAnime])

  // Fetch Trending Manga List
  useEffect(() => {
    if (trendingManga.length === 0) {
      const paramsTrendingManga = {
        page: 1,
        perPage: 50,
        type: 'MANGA',
        sort: 'TRENDING_DESC',
      }

      fetchAnimePage(paramsTrendingManga).then((data) => {
        setTrendingManga(data)
      })
    }
  }, [trendingManga, setTrendingManga])

  // Fetch Top Anime List
  useEffect(() => {
    if (topAnime.length === 0) {
      const paramsTopAnime = {
        page: 1,
        perPage: 50,
        type: 'ANIME',
        sort: 'POPULARITY_DESC',
      }

      fetchAnimePage(paramsTopAnime).then((data) => {
        setTopAnime(data)
      })
    }
  }, [topAnime, setTopAnime])

  // Fetch Top Manga List
  useEffect(() => {
    if (topManga.length === 0) {
      const paramsTopManga = {
        page: 1,
        perPage: 50,
        type: 'MANGA',
        sort: 'POPULARITY_DESC',
      }

      fetchAnimePage(paramsTopManga).then((data) => {
        setTopManga(data)
      })
    }
  }, [topManga, setTopManga])

  // Create Props Object for Featured Anime
  const featuredAnimeProps = {
    type: 'ANIME',
    sort: 'POPULARITY_DESC',
    title: `${currSeason} ${currYear}`,
    year: currYear,
    season: currSeason,
    data: featuredAnime,
    currPage: featuredAnimePage,
    totalPages: 5,
    setCurrPage: setFeaturedAnimePage,
    interval: 7000,
  }

  // Create Props Object for Trending Anime
  const trendingAnimeProps = {
    type: 'ANIME',
    sort: 'TRENDING_DESC',
    title: 'Trending Anime',
    data: trendingAnime,
    perPage: perPage,
    currPage: trendingAnimePage,
    setCurrPage: setTrendingAnimePage,
    totalPages: 5,
  }

  // Create Props Object for Trending Manga
  const trendingMangaProps = {
    type: 'MANGA',
    sort: 'TRENDING_DESC',
    title: 'Trending Manga',
    data: trendingManga,
    perPage: perPage,
    currPage: trendingMangaPage,
    setCurrPage: setTrendingMangaPage,
    totalPages: 5,
  }

  // Create Props Object for All Time Popular Anime
  const allTimePopularAnimeProps = {
    type: 'ANIME',
    sort: 'POPULARITY_DESC',
    title: 'All-Time Popular Anime',
    data: topAnime,
    perPage: perPage,
    currPage: topAnimePage,
    setCurrPage: setTopAnimePage,
    totalPages: 5,
  }

  // Create Props Object for All Time Popular Manga
  const allTimePopularMangaProps = {
    type: 'MANGA',
    sort: 'POPULARITY_DESC',
    title: 'All-Time Popular Manga',
    data: topManga,
    perPage: perPage,
    currPage: topMangaPage,
    setCurrPage: setTopMangaPage,
    totalPages: 5,
  }

  return (
    <main ref={targetRef}>
      <Banner {...featuredAnimeProps} />
      <Carousel {...trendingAnimeProps} />
      <Carousel {...trendingMangaProps} />
      <Carousel {...allTimePopularAnimeProps} />
      <Carousel {...allTimePopularMangaProps} />
    </main>
  )
}

export default Home
