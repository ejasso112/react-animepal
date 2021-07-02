import { useState } from 'react'
import FetchedSearchContext from './FetchedSearchContext'

const FetchedSearchProvider = (props) => {
  const [animeGenres, setAnimeGenres] = useState([])
  const [animeYear, setAnimeYear] = useState('')
  const [animeSeason, setAnimeSeason] = useState('')
  const [animeFormat, setAnimeFormat] = useState([])
  const [animeAiringStatus, setAnimeAiringStatus] = useState('')
  const [animeYearRange, setAnimeYearRange] = useState([])
  const [animeEpisodesRange, setAnimeEpisodesRange] = useState([])
  const [animeDurationRange, setAnimeDurationRange] = useState([])

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

  const onSetAnimeYearRange = (leftVal, rightVal) => {
    setAnimeYearRange([leftVal, rightVal])
  }

  const onSetAnimeEpisodesRange = (leftVal, rightVal) => {
    setAnimeEpisodesRange([leftVal, rightVal])
  }

  const onSetAnimeDurationRange = (leftVal, rightVal) => {
    setAnimeDurationRange([leftVal, rightVal])
  }

  const getQueryString = () => {
    const genreQueryString = animeGenres.map((genre) => `genres=${genre}`).join('&')
    const yearQueryString = animeYear && `year=${animeYear}`
    const seasonQueryString = animeSeason && `season=${animeSeason}`
    const formatQueryString = animeFormat.map((format) => `format=${format}`).join('&')
    const statusQueryString = animeAiringStatus && `status=${animeAiringStatus}`

    const formatYearRangeString = animeYearRange[0] >= 0 && animeYearRange.map((year) => `yearRange=${year}`).join('&')
    const formatEpisodesRangeString = animeEpisodesRange[0] >= 0 && animeEpisodesRange.map((episode) => `episodesRange=${episode}`).join('&')
    const formatDurationRangeString = animeDurationRange[0] >= 0 && animeDurationRange.map((dur) => `durationRange=${dur}`).join('&')

    const queryString = [genreQueryString, yearQueryString, seasonQueryString, formatQueryString, statusQueryString, formatYearRangeString, formatEpisodesRangeString, formatDurationRangeString].filter((value) => value).join('&')
    return queryString ? `?${queryString}` : undefined
  }

  const setQueryString = (queryString) => {
    const parsedQuery = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
    const yearRange = []
    const epRange = []
    const durRange = []
    for (let i = 0; i < parsedQuery.length; i++) {
      let [key, value] = [...parsedQuery[i].split('=')]
      key === 'genres' && onSetAnimeGenre(value)
      key === 'year' && onSetAnimeYear(value)
      key === 'season' && onSetAnimeSeason(value)
      key === 'format' && onSetAnimeFormat(value)
      key === 'status' && onSetAnimeAiringStatus(value)
      key === 'yearRange' && yearRange.push(value)
      key === 'episodesRange' && epRange.push(value)
      key === 'durationRange' && durRange.push(value)
    }

    yearRange[0] && yearRange[1] && onSetAnimeYearRange(...yearRange)
    epRange[0] && epRange[1] && onSetAnimeEpisodesRange(...epRange)
    durRange[0] && durRange[1] && onSetAnimeDurationRange(...durRange)
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

    animeYearRange: animeYearRange,
    setAnimeYearRange: onSetAnimeYearRange,

    animeEpisodesRange: animeEpisodesRange,
    setAnimeEpisodesRange: onSetAnimeEpisodesRange,

    animeDurationRange: animeDurationRange,
    setAnimeDurationRange: onSetAnimeDurationRange,

    getQueryString: getQueryString,
    setQueryString: setQueryString,
  }

  return <FetchedSearchContext.Provider value={FetchedSearchState}>{props.children}</FetchedSearchContext.Provider>
}

export default FetchedSearchProvider
