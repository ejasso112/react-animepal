// Import React Dependencies
import { useContext, useEffect } from 'react'
// Import Contexts
import FetchedAnimeDetailsContext from '../context/FetchedAnimeDetailsContext'
// Import Custom Components
import Banner from '../components/_AnimeDetails/Banner/Banner'
import Sidebar from '../components/_AnimeDetails/Sidebar/Sidebar'
import Overview from '../components/_AnimeDetails/SubContainers/Overview'
// Import API Fetch
import fetchAnimeDetails from '../API/fetchAnimeDetails'

//* Anime Details Container Component
const AnimeDetails = (props) => {
  // Deconstruction Props
  const id = props.match.params.id

  // Getting Context for Anime Details
  const fetchedAnimeDetailsContext = useContext(FetchedAnimeDetailsContext)
  // Getting State for Anime Details
  const { animeDetails, setAnimeDetails } = fetchedAnimeDetailsContext

  // Fetch Anime Details
  useEffect(() => {
    if (animeDetails.length === 0) {
      const paramsAnimeDetails = {
        id: id,
      }

      fetchAnimeDetails(paramsAnimeDetails).then((data) => {
        setAnimeDetails(data)
      })
    }
  }, [id, animeDetails, setAnimeDetails])

  console.log(animeDetails)
  // Create Props Object for Banner
  const bannerProps = {
    id: animeDetails?.id,
    bannerImage: animeDetails?.bannerImage,
    title: animeDetails?.title,
    coverImage: animeDetails?.coverImage,
    description: animeDetails?.description,
  }

  // Create Props Object for Sidebar
  const sidebarProps = {
    id: animeDetails?.id,

    averageScore: animeDetails?.averageScore,
    rankings: animeDetails?.rankings,
    popularity: animeDetails?.popularity,

    title: animeDetails?.title,
    nextAiringEpisode: animeDetails?.nextAiringEpisode,
    format: animeDetails?.format,
    episodes: animeDetails?.episodes,
    duration: animeDetails?.duration,
    status: animeDetails?.status,
    startDate: animeDetails?.startDate,
    endDate: animeDetails?.endDate,
    season: animeDetails?.season,
    seasonYear: animeDetails?.seasonYear,
    studios: animeDetails?.studios,
    source: animeDetails?.source,
    genres: animeDetails?.genres,
    synonyms: animeDetails?.synonyms,
  }

  // Create Props Object for Overview
  const overviewProps = {
    trailer: animeDetails?.trailer,
  }
  return (
    <main>
      <Banner {...bannerProps} />
      <div style={{ margin: '0 16%', display: 'grid', gridTemplateColumns: 'min-content 1fr', gridTemplateRows: 'auto' }}>
        <Sidebar {...sidebarProps} />
        <Overview {...overviewProps} />
      </div>
    </main>
  )
}

export default AnimeDetails
