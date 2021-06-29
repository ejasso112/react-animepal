import { useState } from 'react'
import FetchedSearchContext from './FetchedSearchContext'

const FetchedSearchProvider = (props) => {
  const [animeGenres, setAnimeGenres] = useState([])
  const [animeYear, setAnimeYear] = useState('')
  const [animeSeason, setAnimeSeason] = useState('')
  const [animeFormat, setAnimeFormat] = useState([])
  const [animeAiringStatus, setAnimeAiringStatus] = useState('')

  const onSetAnimeGenre = (genre) => {
    const isUniqueGenre = !animeGenres.includes(genre)
    const index = animeGenres.indexOf(genre)

    if (!isUniqueGenre) {
      return setAnimeGenres((prevState) => {
        const prevStateCopy = [...prevState]
        prevStateCopy.splice(index, 1)
        return prevStateCopy
      })
    }

    return setAnimeGenres((prevState) => [...prevState, genre])
  }

  const onSetAnimeYear = (year) => {
    const isUniqueYear = animeYear !== year
    if (!isUniqueYear) {
      return setAnimeYear('')
    }
    return setAnimeYear(year)
  }

  const onSetAnimeSeason = (season) => {
    const isUniqueSeason = animeSeason !== season
    if (!isUniqueSeason) {
      return setAnimeSeason('')
    }
    return setAnimeSeason(season)
  }

  const onSetAnimeFormat = (format) => {
    const isUniqueFormat = !animeFormat.includes(format)
    const index = animeFormat.indexOf(format)

    if (!isUniqueFormat) {
      return setAnimeFormat((prevState) => {
        const prevStateCopy = [...prevState]
        prevStateCopy.splice(index, 1)
        return prevStateCopy
      })
    }

    return setAnimeFormat((prevState) => [...prevState, format])
  }

  const onSetAnimeAiringStatus = (airingStatus) => {
    const isUniqueAiringStatus = animeAiringStatus !== airingStatus
    if (!isUniqueAiringStatus) {
      return setAnimeAiringStatus('')
    }
    return setAnimeAiringStatus(airingStatus)
  }

  const getQueryString = () => {
    const genreQueryString = animeGenres.map((genre) => `genres=${genre}`).join('&')
    const yearQueryString = animeYear && `year=${animeYear}`
    const seasonQueryString = animeSeason && `season=${animeSeason}`
    const formatQueryString = animeFormat.map((format) => `format=${format}`).join('&')
    const statusQueryString = animeAiringStatus && `status=${animeAiringStatus}`

    const queryString = [genreQueryString, yearQueryString, seasonQueryString, formatQueryString, statusQueryString].filter((value) => value !== '').join('&')
    return queryString ? `?${queryString}` : undefined
  }

  const setQueryString = (queryString) => {
    const parsedQuery = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')

    for (let i = 0; i < parsedQuery.length; i++) {
      let [key, value] = [...parsedQuery[i].split('=')]
      key === 'genres' && onSetAnimeGenre(value)
      key === 'year' && onSetAnimeYear(value)
      key === 'season' && onSetAnimeSeason(value)
      key === 'format' && onSetAnimeFormat(value)
      key === 'status' && onSetAnimeAiringStatus(value)
    }
  }

  const FetchedSearchState = {
    animeGenres: animeGenres,
    setAnimeGenre: onSetAnimeGenre,

    animeYear: animeYear,
    setAnimeYear: onSetAnimeYear,

    animeSeason: animeSeason,
    setAnimeSeason: onSetAnimeSeason,

    animeFormat: animeFormat,
    setAnimeFormat: onSetAnimeFormat,

    animeAiringStatus: animeAiringStatus,
    setAnimeAiringStatus: onSetAnimeAiringStatus,

    getQueryString: getQueryString,
    setQueryString: setQueryString,
  }

  return <FetchedSearchContext.Provider value={FetchedSearchState}>{props.children}</FetchedSearchContext.Provider>
}

export default FetchedSearchProvider
