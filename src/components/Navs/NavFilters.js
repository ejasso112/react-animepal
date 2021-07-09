// Import React Dependancies
import { useCallback, useRef, useContext } from 'react'
import FetchedSearchContext from '../../context/FetchedSearchContext'

// Import Custom Component
import NavFilterSearch from './navFilterSearch'
import NavFilterDropdown from './navFilterDropdown'
import NavFilterRange from './navFilterRange'
import NavFilterCheckbox from './navFilterCheckbox'
//Import Helpers
import { getCurrYear } from '../../services/utilities'
//Import Styles
import classes from './NavFilters.module.scss'

//* Filters Nav Component
const NavFilters = (props) => {
  const { onChange } = { ...props }
  const ref = useRef(null)
  // Variable to hold next year value
  const nextYear = getCurrYear() + 1

  const fetchedSearchContext = useContext(FetchedSearchContext)
  const { animeValues } = { ...fetchedSearchContext }
  ref.current = { ...animeValues }
  // Array of Genre options
  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Hentai', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller']

  // Array of Year options
  const years = [
    ...Array(nextYear - 1940 + 1)
      .fill()
      .map((_, i) => nextYear - i + ''),
  ]

  // Array of Season options
  const seasons = ['Winter', 'Summer', 'Spring', 'Fall']

  // Array of Format options
  const formats = ['TV Show', 'Movie', 'TV Short', 'Special', 'OVA', 'ONA', 'Music']

  // Array of Status options
  const status = ['Airing', 'Finished', 'Not Yet Aired', 'Cancelled']

  // Handler for when some value is changed in the child components through onChange prop

  const onChangeHandler = useCallback(
    (val, type) => {
      let newQueryObj = { ...ref.current }
      // Removes key value pair of key type
      delete newQueryObj[type]
      // Add deleted type(key) with new values to object if value no empty array
      newQueryObj = val.length > 0 ? { ...newQueryObj, [type]: val } : { ...newQueryObj }
      ref.current = newQueryObj
      // Call setAnimeValues method passed by props from context
      onChange(newQueryObj)
    },
    // eslint-disable-next-line
    []
  )
  // const testString = JSON.stringify(animeValues?.search)
  // console.log(testString && testString)
  // console.log(testString && JSON.parse(testString))
  //* Render Filters Nav
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <NavFilterSearch heading='Search' type='search' defaultValue={animeValues?.search} onChange={onChangeHandler} timeout={400} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Genres' options={genres} defaultValues={animeValues?.genres} type='genres' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Year' options={years} defaultValues={animeValues?.year} type='year' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Season' options={seasons} defaultValues={animeValues?.season} type='season' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Format' options={formats} defaultValues={animeValues?.format} type='format' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Airing Status' options={status} defaultValues={animeValues?.status} type='status' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterRange heading='Year Range' min={1940} max={nextYear} defaultValues={animeValues?.yearRange} type='yearRange' onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Episodes' min={0} max={150} defaultValues={animeValues?.episodeRange} type='episodeRange' onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Duration' min={0} max={170} defaultValues={animeValues?.durationRange} type='durationRange' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterCheckbox heading='Hentai' onChange={onChangeHandler} enabled={animeValues?.hentai} type='hentai' timeout={600} />
      </div>
    </div>
  )
}

export default NavFilters
