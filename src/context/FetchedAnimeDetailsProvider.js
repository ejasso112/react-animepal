import { useState } from 'react'
import FetchedAnimeDetailsContext from './FetchedAnimeDetailsContext'

const FetchedAnimeDetailsProvider = (props) => {
  const [animeDetails, setAnimeDetails] = useState([])

  const FetchedAnimeState = {
    animeDetails: animeDetails,
    setAnimeDetails: setAnimeDetails,
  }

  return <FetchedAnimeDetailsContext.Provider value={FetchedAnimeState}>{props.children}</FetchedAnimeDetailsContext.Provider>
}

export default FetchedAnimeDetailsProvider
