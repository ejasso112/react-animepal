import { useState } from 'react'
import FetchedSearchContext from './FetchedSearchContext'

const FetchedSearchProvider = (props) => {
  const [animeValues, setAnimeValues] = useState({})

  const FetchedSearchState = {
    animeValues: animeValues,
    setAnimeValues: setAnimeValues,
  }

  return <FetchedSearchContext.Provider value={FetchedSearchState}>{props.children}</FetchedSearchContext.Provider>
}

export default FetchedSearchProvider
