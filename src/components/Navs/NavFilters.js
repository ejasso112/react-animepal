// Import React Dependancies
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
// Import Custom Component
import NavFilterSearch from './navFilterSearch'
import NavFilterDropdown from './navFilterDropdown'
import NavFilterRange from './navFilterRange'
import NavFilterCheckbox from './navFilterCheckbox'
//Import Helpers
import { getQueryObject, getCurrYear } from '../../services/utilities'
//Import Styles
import classes from './NavFilters.module.scss'

//* Filters Nav Component
const NavFilters = (props = { onChange: () => {} }) => {
  // Destructuring Props
  const { onChange } = { ...props }
  // Variable to hold location search query string
  const queryString = useLocation().search
  // Variable to hold the default values object
  const defaultValues = getQueryObject(queryString)
  // Variable to hold next year value
  const nextYear = getCurrYear() + 1

  // Array of Sort options
  const sort = ['Title', 'Popularity', 'Average Score', 'Trending', 'Favorites', 'Date Added', 'Release Date']

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
      // Varibale to hold copy of default values
      let newQueryObj = { ...defaultValues }
      // Removes key value pair of key type
      delete newQueryObj[type]

      // Add deleted type(key) with new values to object if value no empty array
      newQueryObj = val.length > 0 ? { ...newQueryObj, [type]: val } : { ...newQueryObj }

      // Call onChange method passed by props from parent component
      onChange(newQueryObj)
    },
    // eslint-disable-next-line
    [onChange]
  )

  //* Render Filters Nav
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <NavFilterSearch heading='Search' type='search' defaultValue={defaultValues?.search} onChange={onChangeHandler} timeout={400} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Sort By' options={sort} defaultValues={defaultValues?.sort} type='sort' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterDropdown heading='Genres' options={genres} defaultValues={defaultValues?.genres} type='genres' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Year' options={years} defaultValues={defaultValues?.year} type='year' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Season' options={seasons} defaultValues={defaultValues?.season} type='season' onChange={onChangeHandler} timeout={600} />
        <NavFilterDropdown heading='Format' options={formats} defaultValues={defaultValues?.format} type='format' onChange={onChangeHandler} timeout={600} multiSelect />
        <NavFilterDropdown heading='Airing Status' options={status} defaultValues={defaultValues?.status} type='status' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterRange heading='Year Range' min={1940} max={nextYear} defaultValues={defaultValues?.yearRange} type='yearRange' onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Episodes' min={0} max={150} defaultValues={defaultValues?.episodeRange} type='episodeRange' onChange={onChangeHandler} timeout={600} />
        <NavFilterRange heading='Duration' min={0} max={170} defaultValues={defaultValues?.durationRange} type='durationRange' onChange={onChangeHandler} timeout={600} />
        <div className={classes['break']} />
        <NavFilterCheckbox heading='Hentai' onChange={onChangeHandler} enabled={defaultValues?.hentai} type='hentai' timeout={600} />
      </div>
    </div>
  )
}

export default NavFilters
