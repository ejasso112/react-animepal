// Import React Dependencies
import { useContext, useEffect, useRef } from 'react'
// Import Contexts
import FetchedListsContext from '../context/FetchedListsContext'
// Import Custom Components
import CarouselSlider from '../components/Carousels/CarouselSlider'
// Import API Fetch
import fetchAnimePage from '../API/fetchAnimePage'

//* Manga Component
const Manga = () => {
  // Getting Context for Fetched Manga Lists
  const fetchedListsContext = useContext(FetchedListsContext)
  // Getting State for Featured Manga List
  const { perPage, setPerPage } = { ...fetchedListsContext }

  // Getting State for Trending Manga List
  const { trendingManga, trendingMangaPage, setTrendingManga, setTrendingMangaPage } = { ...fetchedListsContext }
  // Getting State for Popular This Season Manga List
  const { popularManga, popularMangaPage, setPopularManga, setPopularMangaPage } = { ...fetchedListsContext }
  // Getting State for Upcoming Manga List
  const { upcomingManga, upcomingMangaPage, setUpcomingManga, setUpcomingMangaPage } = { ...fetchedListsContext }
  // Getting State for All Time Popular Manga List
  const { topManga, topMangaPage, setTopManga, setTopMangaPage } = { ...fetchedListsContext }

  const targetRef = useRef()

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

  // Fetch Popular This Season Manga List
  useEffect(() => {
    if (popularManga.length === 0) {
      const paramsPopularManga = {
        page: 1,
        perPage: 50,
        type: 'MANGA',
        sort: 'POPULARITY_DESC',
        status: 'RELEASING',
      }

      fetchAnimePage(paramsPopularManga).then((data) => {
        setPopularManga(data)
      })
    }
  }, [popularManga, setPopularManga])

  // Fetch Upcoming Manga List
  useEffect(() => {
    if (upcomingManga.length === 0) {
      const paramsUpcomingManga = {
        page: 1,
        perPage: 50,
        type: 'MANGA',
        sort: 'POPULARITY_DESC',
        status: 'NOT_YET_RELEASED',
      }

      fetchAnimePage(paramsUpcomingManga).then((data) => {
        setUpcomingManga(data)
      })
    }
  }, [upcomingManga, setUpcomingManga])

  // Fetch Top All Time Manga List
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

  // Create Props Object for Trending Manga
  const trendingMangaProps = {
    heading: 'Trending',
    to: { pathname: 'Search/Manga', search: '?sort=Trending' },
    type: 'Manga',
    data: trendingManga,
    perPage: perPage,
    currPage: trendingMangaPage,
    setCurrPage: setTrendingMangaPage,
    totalPages: 5,
  }

  // Create Props Object for Popular This Season Manga
  const popularThisSeasonMangaProps = {
    heading: 'Popular This Season',
    to: { pathname: 'Search/Manga', search: '?sort=Popularity&status=Releasing' },
    type: 'Manga',
    data: popularManga,
    perPage: perPage,
    currPage: popularMangaPage,
    setCurrPage: setPopularMangaPage,
    totalPages: 5,
  }

  // Create Props Object for Upcoming Manga
  const topUpcomingMangaProps = {
    heading: 'Top Upcoming',
    to: { pathname: 'Search/Manga', search: '?sort=Popularity&status=Not Yet Released' },
    type: 'Manga',
    data: upcomingManga,
    perPage: perPage,
    currPage: upcomingMangaPage,
    setCurrPage: setUpcomingMangaPage,
    totalPages: 5,
  }

  // Create Props Object for All Time Popular Manga
  const allTimePopularMangaProps = {
    heading: 'All-Time Popular',
    to: { pathname: 'Search/Manga', search: '?sort=Popularity' },
    type: 'Manga',
    data: topManga,
    perPage: perPage,
    currPage: topMangaPage,
    setCurrPage: setTopMangaPage,
    totalPages: 5,
  }

  return (
    <main ref={targetRef} style={{ paddingTop: '6em' }}>
      <CarouselSlider {...trendingMangaProps} />
      <CarouselSlider {...popularThisSeasonMangaProps} />
      <CarouselSlider {...topUpcomingMangaProps} />
      <CarouselSlider {...allTimePopularMangaProps} />
    </main>
  )
}

export default Manga
