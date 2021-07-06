// Import React Dependancies
import { useState, useCallback, useEffect } from 'react'
// Import Custom Hook
import { useIsMount } from '../../services/customHooks'
// Import Custom Component
import NavFilterSearch from './navFilterSearch'
import NavFilterDropdown from './navFilterDropdown'
import NavFilterRange from './navFilterRange'
import NavFilterCheckbox from './navFilterCheckbox'

import classes from './NavFilters.module.scss'
import { getQueryObject } from '../../services/utilities'
import { useHistory, useLocation } from 'react-router-dom'

//* Filters Nav Component
const NavFilters = (props = { onChange: () => {} }) => {
  const { onChange } = { ...props }
  const location = useLocation().search
  const [values, setValues] = useState(getQueryObject(location) || {})
  const isMount = useIsMount()
  const history = useHistory()

  useEffect(() => {
    JSON.stringify(values) !== JSON.stringify(getQueryObject(location)) && history.go(0)
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (!isMount) {
      JSON.stringify(values) !== JSON.stringify(getQueryObject(location)) && onChange && onChange(values)
    }
    // eslint-disable-next-line
  }, [values, onChange])

  const onChangeHandler = useCallback((val, type) => {
    setValues((prevValues) => {
      const prevValuesCopy = { ...prevValues }
      delete prevValuesCopy[type]
      if (val.length > 0) {
        return { ...prevValuesCopy, [type]: val }
      }
      return { ...prevValuesCopy }
    })
  }, [])

  // * Render Filters Nav
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <NavFilterSearch type='search' onChange={onChangeHandler} defaultValue={values?.search} timeout={400} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Sort By' options={['Title', 'Popularity', 'Average Score', 'Trending', 'Favorites', 'Date Added', 'Release Data']} defaultValues={values?.sort} type='sort' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Genres' options={['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy']} defaultValues={values?.genres} type='genres' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Year' options={['2021', '2020', '2019', '2018', '2017']} defaultValues={values?.year} type='year' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Season' options={['Winter', 'Summer', 'Spring', 'Fall']} defaultValues={values?.season} type='season' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Format' options={['TV', 'Show', 'Movie', 'TV Short', 'Special', 'OVA', 'ONA', 'Music']} defaultValues={values?.format} type='format' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Airing Status' options={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} defaultValues={values?.status} type='status' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterRange heading='Year Range' min={1940} max={2022} defaultValues={values?.yearRange} type='yearRange' onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Episodes' min={0} max={150} defaultValues={values?.episodeRange} type='episodeRange' onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Duration' min={0} max={170} defaultValues={values?.durationRange} type='durationRange' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterCheckbox heading='Hentai' onChange={onChangeHandler} enabled={values?.hentai} type='hentai' timeout={600} />
      </div>
    </div>
  )
}

export default NavFilters
