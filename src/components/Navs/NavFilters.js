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
//* Filters Nav Component
const NavFilters = (props = { onChange: () => {} }) => {
  const { onChange } = { ...props }
  const [values, setValues] = useState({})
  const isMount = useIsMount()

  useEffect(() => {
    !isMount && onChange && onChange(values)

    // eslint-disable-next-line
  }, [values, onChange])

  const onChangeHandler = useCallback((values, type) => {
    setValues((prevValues) => {
      const prevValuesCopy = { ...prevValues }
      delete prevValuesCopy[type]
      if (values.length > 0) {
        return { ...prevValuesCopy, [type]: values }
      }
      return { ...prevValuesCopy }
    })
  }, [])

  // * Render Filters Nav
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <NavFilterSearch type='search' onChange={onChangeHandler} timeout={400} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Genres' options={['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy']} type='genres' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Year' options={['2021', '2020', '2019', '2018', '2017']} type='year' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Season' options={['Winter', 'Summer', 'Spring', 'Fall']} type='season' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Format' options={['TV', 'Show', 'Movie', 'TV Short', 'Special', 'OVA', 'ONA', 'Music']} type='format' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Airing Status' options={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} type='status' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterRange heading='Year Range' type='yearRange' min={1940} max={2022} onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Episodes' type='episodeRange' min={0} max={150} onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Duration' type='durationRange' min={0} max={170} onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterCheckbox heading='Hentai' />
      </div>
    </div>
  )
}

export default NavFilters
