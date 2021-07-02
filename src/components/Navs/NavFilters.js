import { useContext } from 'react'
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
  const { animeGenres, animeYear, animeSeason, animeFormat, animeAiringStatus } = fetchedSearchContext
  const { setAnimeGenre, setAnimeYear, setAnimeSeason, setAnimeFormat, setAnimeAiringStatus } = fetchedSearchContext
  const { animeYearRange, animeEpisodesRange, animeDurationRange } = fetchedSearchContext
  const { setAnimeYearRange, setAnimeEpisodesRange, setAnimeDurationRange } = fetchedSearchContext

  const onSearchHandler = (e) => {
    console.log(e)
  }
  // * Render Filters Nav
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <NavFilterSearch heading='Search' onChange={onSearchHandler} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Genres' content={['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy']} onClick={setAnimeGenre} selected={animeGenres} amount={animeGenres.length - 1} multi />
        <NavFilterDropdown heading='Year' content={['2021', '2020', '2019', '2018', '2017']} onClick={setAnimeYear} selected={[animeYear]} />
        <NavFilterDropdown heading='Season' content={['Winter', 'Summer', 'Spring', 'Fall']} onClick={setAnimeSeason} selected={[animeSeason]} />
        <NavFilterDropdown heading='Format' content={['TV', 'Show', 'Movie', 'TV Short', 'Special', 'OVA', 'ONA', 'Music']} onClick={setAnimeFormat} selected={animeFormat} amount={animeFormat.length - 1} multi />
        <NavFilterDropdown heading='Airing Status' content={['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']} onClick={setAnimeAiringStatus} selected={[animeAiringStatus]} />
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
