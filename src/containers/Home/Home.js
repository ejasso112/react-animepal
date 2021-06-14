// Import React Dependencies
import { useContext, useEffect } from 'react'
// Import Contexts
import FetchedListsContext from '../../context/FetchedListsContext'
// Import Custom Components
import HeaderHome from '../../components/Banner/Banner'
// Import API Fetch
import fetchFeatured from '../../API/fetchFeatured'
// Import Helpers
import { getYear, getSeason } from '../../services/utilities'

const Home = () => {
  const fetchedListsContext = useContext(FetchedListsContext)
  const { featuredAnime, featuredAnimePage, setFeaturedAnime, setFeaturedAnimePage } = fetchedListsContext

  const currYear = getYear()
  const currSeason = getSeason()

  // Fetch Featured Anime List for HeaderHome Component
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

  return (
    <main>
      <HeaderHome {...featuredAnimeProps} />
    </main>
  )
}

export default Home
