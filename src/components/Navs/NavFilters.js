import { useCallback } from 'react'
// Import Custom Component
import NavFilterSearch from './navFilterSearch'
import NavFilterDropdown from './navFilterDropdown'
import NavFilterRange from './navFilterRange'
import NavFilterCheckbox from './navFilterCheckbox'

import classes from './NavFilters.module.scss'
//* Filters Nav Component
const NavFilters = () => {
  // Costum Hook to check is isMount or Rerender

  const onSearchHandler = useCallback((value) => {
    console.log(value)
  }, [])

  const onGenreChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onYearChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onSeasonChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onFormatChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onStatusChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onYearRangeChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onEpisodesRangeChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  const onDurationRangeChangeHandler = useCallback((values) => {
    console.log(values)
  }, [])

  // * Render Filters Nav
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <NavFilterSearch onChange={onSearchHandler} timeout={400} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Genres' options={['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy']} onChange={onGenreChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Year' options={['2021', '2020', '2019', '2018', '2017']} onChange={onYearChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Season' options={['Winter', 'Summer', 'Spring', 'Fall']} onChange={onSeasonChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Format' options={['TV', 'Show', 'Movie', 'TV Short', 'Special', 'OVA', 'ONA', 'Music']} onChange={onFormatChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Airing Status' options={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} onChange={onStatusChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterRange heading='Year Range' min={1940} max={2022} onChange={onYearRangeChangeHandler} timeout={600} />
        <NavFilterRange heading='Episodes' min={0} max={150} onChange={onEpisodesRangeChangeHandler} timeout={600} />
        <NavFilterRange heading='Duration' min={0} max={170} onChange={onDurationRangeChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterCheckbox heading='Hentai' />
      </div>
    </div>
  )
}

export default NavFilters
