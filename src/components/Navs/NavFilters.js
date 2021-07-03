import { useCallback, useContext } from 'react'
import FetchedSearchContext from '../../context/FetchedSearchContext'
// Import Custom Component
import NavFilterSearch from './navFilterSearch'
import NavFilterDropdown from './navFilterDropdown'
import NavFilterRange from './navFilterRange'
import NavFilterCheckbox from './navFilterCheckbox'

import classes from './NavFilters.module.scss'
//* Filters Nav Component
const NavFilters = () => {
  const fetchedSearchContext = useContext(FetchedSearchContext)
  const { animeYearRange, animeEpisodesRange, animeDurationRange } = fetchedSearchContext
  const { setAnimeYearRange, setAnimeEpisodesRange, setAnimeDurationRange } = fetchedSearchContext

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
        <NavFilterRange heading='Year Range' min={1940} max={2022} onChange={setAnimeYearRange} leftVal={Number(animeYearRange[0])} rightVal={Number(animeYearRange[1])} />
        <NavFilterRange heading='Episodes' min={0} max={150} onChange={setAnimeEpisodesRange} leftVal={Number(animeEpisodesRange[0])} rightVal={Number(animeEpisodesRange[1])} />
        <NavFilterRange heading='Duration' min={0} max={170} onChange={setAnimeDurationRange} leftVal={Number(animeDurationRange[0])} rightVal={Number(animeDurationRange[1])} />
        <div className={classes['break']} />

        <NavFilterCheckbox heading='Hide My Anime' />
        <NavFilterCheckbox heading='Only Show My Anime' />
        <NavFilterCheckbox heading='Hentai' />
        {/* <NavFilterDropdown heading='Streaming On' content={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} onClick={setAnimeAiringStatus} selected={[animeAiringStatus]} />
      <NavFilterDropdown heading='Country Of Origin' content={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} onClick={setAnimeAiringStatus} selected={[animeAiringStatus]} />
      <NavFilterDropdown heading='Source Material' content={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} onClick={setAnimeAiringStatus} selected={[animeAiringStatus]} /> */}
      </div>
    </div>
  )
}

export default NavFilters
