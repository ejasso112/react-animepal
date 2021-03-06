// Import React Dependencies
import { useContext, useEffect, useRef } from 'react'
// Import Contexts
import FetchedListsContext from '../context/FetchedListsContext'
// Import Custom Components
import CarouselSlider from '../components/Carousels/CarouselSlider'
// Import API Fetch
import fetchAnimePage from '../API/fetchAnimePage'
// Import Helpers
import { getCurrYear, getCurrSeason, getNextSeason } from '../services/utilities'

//* Anime Component
const Anime = () => {
  // Getting Context for Fetched Anime Lists
  const fetchedListsContext = useContext(FetchedListsContext)
  // Getting State for Featured Anime List
  const { perPage, setPerPage } = { ...fetchedListsContext }
  // Getting State for Trending Anime List
  const { trendingAnime, trendingAnimePage, setTrendingAnime, setTrendingAnimePage } = { ...fetchedListsContext }
  // Getting State for Popular This Season Anime List
  const { popularAnime, popularAnimePage, setPopularAnime, setPopularAnimePage } = { ...fetchedListsContext }
  // Getting State for Upcoming Anime List
  const { upcomingAnime, upcomingAnimePage, setUpcomingAnime, setUpcomingAnimePage } = { ...fetchedListsContext }
  // Getting State for All Time Popular Anime List
  const { topAnime, topAnimePage, setTopAnime, setTopAnimePage } = { ...fetchedListsContext }

  const targetRef = useRef()
  const currYear = getCurrYear()
  const currSeason = getCurrSeason()
  const nextSeason = getNextSeason()

  // Resize Handler for Calculating Carousel Items Per Page
  useEffect(() => {
    const resizeHandler = () => {
      if (targetRef.current) {
        const itemWidth = 256

        const totalItems = Math.floor(targetRef.current.offsetWidth / itemWidth)
        totalItems !== perPage && totalItems <= 10 && setPerPage(totalItems)
      }
    }
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [perPage, setPerPage])

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

  // Fetch Popular This Season Anime List
  useEffect(() => {
    if (popularAnime.length === 0) {
      const paramsPopularAnime = {
        page: 1,
        perPage: 50,
        type: 'ANIME',
        sort: 'POPULARITY_DESC',
        season: currSeason.toUpperCase(),
        seasonYear: currYear,
      }

      fetchAnimePage(paramsPopularAnime).then((data) => {
        setPopularAnime(data)
      })
    }
  }, [popularAnime, setPopularAnime, currSeason, currYear])

  // Fetch Upcoming Anime List
  useEffect(() => {
    if (upcomingAnime.length === 0) {
      const paramsUpcomingAnime = {
        page: 1,
        perPage: 50,
        type: 'ANIME',
        sort: 'POPULARITY_DESC',
        season: nextSeason.toUpperCase(),
        seasonYear: currYear,
      }

      fetchAnimePage(paramsUpcomingAnime).then((data) => {
        setUpcomingAnime(data)
      })
    }
  }, [upcomingAnime, setUpcomingAnime, nextSeason, currYear])

  // Fetch Top All Time Anime List
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

  // Create Props Object for Trending Anime
  const trendingAnimeProps = {
    heading: 'Trending',
    to: { pathname: '/Search/Anime', search: '?sort=Trending' },
    type: 'Anime',
    data: trendingAnime,
    perPage: perPage,
    currPage: trendingAnimePage,
    setCurrPage: setTrendingAnimePage,
    totalPages: 5,
  }

  // Create Props Object for Popular This Season Anime
  const popularThisSeasonAnimeProps = {
    heading: 'Popular This Season',
    to: { pathname: '/Search/Anime', search: `?sort=Popularity&year=${currYear}&season=${currSeason}` },
    type: 'Anime',
    data: popularAnime,
    perPage: perPage,
    currPage: popularAnimePage,
    setCurrPage: setPopularAnimePage,
    totalPages: 5,
  }

  // Create Props Object for Upcoming Anime
  const topUpcomingAnimeProps = {
    heading: 'Top Upcoming',
    to: { pathname: '/Search/Anime', search: `?sort=Popularity&year=${currYear}&season=${nextSeason}` },
    type: 'Anime',
    data: upcomingAnime,
    perPage: perPage,
    currPage: upcomingAnimePage,
    setCurrPage: setUpcomingAnimePage,
    totalPages: 5,
  }

  // Create Props Object for All Time Popular Anime
  const allTimePopularAnimeProps = {
    heading: 'All-Time Popular',
    to: { pathname: '/Search/Anime', search: '?sort=Popularity' },
    type: 'Anime',
    data: topAnime,
    perPage: perPage,
    currPage: topAnimePage,
    setCurrPage: setTopAnimePage,
    totalPages: 5,
  }

  //* Render Anime
  return (
    <main ref={targetRef} style={{ paddingTop: '6em' }}>
      <CarouselSlider {...trendingAnimeProps} />
      <CarouselSlider {...popularThisSeasonAnimeProps} />
      <CarouselSlider {...topUpcomingAnimeProps} />
      <CarouselSlider {...allTimePopularAnimeProps} />
    </main>
  )
}

export default Anime
