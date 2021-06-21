// Import React Dependencies
import { useContext, useEffect } from 'react'
// Import Contexts
import FetchedAnimeDetailsContext from '../context/FetchedAnimeDetailsContext'
// Import Custom Components
import Banner from '../components/_AnimeDetails/Banner/Banner'
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
    id: animeDetails.id,
    bannerImage: animeDetails?.bannerImage,
    title: animeDetails?.title,
    coverImage: animeDetails?.coverImage,
    description: animeDetails?.description,
  }

  return (
    <main>
      <Banner {...bannerProps} />
    </main>
  )
}

export default AnimeDetails
