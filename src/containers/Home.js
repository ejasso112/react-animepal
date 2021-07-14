// Import React Dependencies
import { useContext, useEffect, useRef } from 'react'
// Import Contexts
import FetchedListsContext from '../context/FetchedListsContext'
// Import Custom Components
import CarouselBanner from '../components/Carousels/CarouselBanner'
import CarouselSlider from '../components/Carousels/CarouselSlider'
// Import API Fetch
import fetchFeatured from '../API/fetchFeatured'
import fetchAnimePage from '../API/fetchAnimePage'
// Import Helpers
import { getCurrYear, getCurrSeason } from '../services/utilities'

//* Home Comoponet
const Home = () => {
  // Getting Context for Fetched Anime Lists
  const fetchedListsContext = useContext(FetchedListsContext)
  // Getting State for Featured Anime List
  const { perPage, setPerPage } = { ...fetchedListsContext }
  // Getting State for Featured Anime List
  const { featuredAnime, featuredAnimePage, setFeaturedAnime, setFeaturedAnimePage } = { ...fetchedListsContext }
  // Getting State for Trending Anime List
  const { trendingAnime, trendingAnimePage, setTrendingAnime, setTrendingAnimePage } = { ...fetchedListsContext }
  // Getting State for Trending Manga List
  const { trendingManga, trendingMangaPage, setTrendingManga, setTrendingMangaPage } = { ...fetchedListsContext }
  // Getting State for All Time Popular Anime List
  const { topAnime, topAnimePage, setTopAnime, setTopAnimePage } = { ...fetchedListsContext }
  // Getting State for All Time Popular Manga List
  const { topManga, topMangaPage, setTopManga, setTopMangaPage } = { ...fetchedListsContext }

  const targetRef = useRef()
  const currYear = getCurrYear()
  const currSeason = getCurrSeason()

  // Resize Handler for Calculating Carousel Items Per Page
  useEffect(() => {
    const resizeHandler = () => {
      if (targetRef.current) {
        const itemWidth = 256

        const totalItems = Math.floor(targetRef.current.offsetWidth / itemWidth)
        const itemsToDisplay = totalItems > 10 ? 10 : totalItems

        itemsToDisplay !== perPage && itemsToDisplay > 0 && setPerPage(itemsToDisplay)
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
        seasonYear: currYear,
        season: currSeason.toUpperCase(),
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
    heading: `${currSeason} ${currYear}`,
    to: { pathname: '/Search/Anime', search: `?sort=Popularity&year=${currYear}&season=${currSeason}` },
    type: 'Anime',
    data: featuredAnime,
    currPage: featuredAnimePage,
    totalPages: 5,
    setCurrPage: setFeaturedAnimePage,
    interval: 7000,
  }

  // Create Props Object for Trending Anime
  const trendingAnimeProps = {
    heading: 'Trending Anime',
    to: { pathname: '/Search/Anime', search: '?sort=Trending' },
    type: 'Anime',
    data: trendingAnime,
    perPage: perPage,
    currPage: trendingAnimePage,
    setCurrPage: setTrendingAnimePage,
    totalPages: 5,
  }

  // Create Props Object for Trending Manga
  const trendingMangaProps = {
    heading: 'Trending Manga',
    to: { pathname: '/Search/Manga', search: '?sort=Trending' },
    type: 'Manga',
    data: trendingManga,
    perPage: perPage,
    currPage: trendingMangaPage,
    setCurrPage: setTrendingMangaPage,
    totalPages: 5,
  }

  // Create Props Object for All Time Popular Anime
  const allTimePopularAnimeProps = {
    heading: 'All-Time Popular Anime',
    to: { pathname: '/Search/Anime', search: '?sort=Popularity' },
    type: 'Anime',
    data: topAnime,
    perPage: perPage,
    currPage: topAnimePage,
    setCurrPage: setTopAnimePage,
    totalPages: 5,
  }

  // Create Props Object for All Time Popular Manga
  const allTimePopularMangaProps = {
    heading: 'All-Time Popular Manga',
    to: { pathname: '/Search/Manga', search: '?sort=Popularity' },
    type: 'Manga',
    data: topManga,
    perPage: perPage,
    currPage: topMangaPage,
    setCurrPage: setTopMangaPage,
    totalPages: 5,
  }

  //* Render Home
  return (
    <main ref={targetRef}>
      <CarouselBanner {...featuredAnimeProps} />
      <CarouselSlider {...trendingAnimeProps} />
      <CarouselSlider {...trendingMangaProps} />
      <CarouselSlider {...allTimePopularAnimeProps} />
      <CarouselSlider {...allTimePopularMangaProps} />
    </main>
  )
}

export default Home
