import { useState } from 'react'
import FetchedListsContext from './FetchedListsContext'

const FetchedListsProvider = (props) => {
  const [featuredAnime, setFeaturedAnime] = useState([])
  const [featuredAnimePage, setFeaturedAnimePage] = useState(1)

  const FetchedListsState = {
    featuredAnime: featuredAnime,
    featuredAnimePage: featuredAnimePage,
    setFeaturedAnime: setFeaturedAnime,
    setFeaturedAnimePage: setFeaturedAnimePage,
  }

  return <FetchedListsContext.Provider value={FetchedListsState}>{props.children}</FetchedListsContext.Provider>
}

export default FetchedListsProvider
