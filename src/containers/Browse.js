import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// Import Custom Components
import NavFilters from '../components/Navs/NavFilters'
import NavTags from '../components/Navs/NavTags'

import classes from './Browse.module.scss'

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFirst, setisFirst] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (isFirst && searchQuery) {
      setisFirst(false)
      history.push({ pathname: '/Search', search: searchQuery })
    }

    !isFirst && history.replace({ pathname: '/Search', search: searchQuery })
  }, [history, searchQuery, isFirst])

  const onNavFiltersChangeHandler = useCallback((values) => {
    let queryObj = {}

    for (const [key, value] of Object.entries(values)) {
      queryObj = { ...queryObj, [key]: value.map((value) => `${key}=${value}`).join('&') }
    }

    const { search, genres, year, season, format, status, yearRange, episodeRange, durationRange, hentai } = { ...queryObj }
    const queryString = [search, genres, year, season, format, status, yearRange, episodeRange, durationRange, hentai].filter((value) => value).join('&')
    setSearchQuery(queryString ? `?${queryString}` : '')
  }, [])

  return (
    <main className={classes['container']} style={{ paddingTop: '6em', margin: '0 2.5%' }}>
      <NavFilters onChange={onNavFiltersChangeHandler} />
      {/* <NavTags /> */}
    </main>
  )
}

export default Browse
