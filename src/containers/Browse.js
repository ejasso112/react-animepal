import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

// Import Custom Components
import NavFilters from '../components/Navs/NavFilters'
import NavTags from '../components/Navs/NavTags'

import classes from './Browse.module.scss'

const Browse = () => {
  const history = useHistory()

  const onNavFiltersChangeHandler = useCallback(
    (values) => {
      console.log(values)
      let queryObj = {}
      for (const [key, value] of Object.entries(values)) {
        queryObj = { ...queryObj, [key]: value.map((value) => `${key}=${value}`).join('&') }
      }

      const { search, sort, genres, year, season, format, status, yearRange, episodeRange, durationRange, hentai } = { ...queryObj }
      const queryString = [search, sort, genres, year, season, format, status, yearRange, episodeRange, durationRange, hentai].filter((value) => value).join('&')

      if (!history.location.search) history.push({ pathname: '/Search', search: queryString })
      else history.replace({ pathname: '/Search', search: queryString })
    },
    [history]
  )

  return (
    <main className={classes['container']} style={{ paddingTop: '6em', margin: '0 2.5%' }}>
      <NavFilters onChange={onNavFiltersChangeHandler} />
      <NavTags onChange={onNavFiltersChangeHandler} />
    </main>
  )
}

export default Browse
