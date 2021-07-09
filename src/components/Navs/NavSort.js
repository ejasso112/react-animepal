// Import React Dependancies
import { useCallback, useRef, useContext } from 'react'
import FetchedSearchContext from '../../context/FetchedSearchContext'
// Import Custom Component
import NavFilterDropdown from './navFilterDropdown'
import NavFilterDisplay from './navFilterDisplay'

//Import Styles
import classes from './NavSort.module.scss'

const NavSort = (props) => {
  // Destructuring Props
  const { onChange } = { ...props }
  const ref = useRef(null)

  const fetchedSearchContext = useContext(FetchedSearchContext)
  const { animeValues } = { ...fetchedSearchContext }
  ref.current = { ...animeValues }

  // Array of Sort options
  const sort = ['Title', 'Popularity', 'Average Score', 'Trending', 'Favorites', 'Date Added', 'Release Date']

  // Handler for when some value is changed in the child components through onChange prop
  const onChangeHandler = useCallback(
    (val, type) => {
      // Varibale to hold copy of default values
      let newQueryObj = { ...ref.current }
      // Removes key value pair of key type
      delete newQueryObj[type]

      // Add deleted type(key) with new values to object if value no empty array
      newQueryObj = val.length > 0 ? { ...newQueryObj, [type]: val } : { ...newQueryObj, [type]: ['Popularity'] }
      ref.current = newQueryObj

      // Call onChange method passed by props from parent component
      onChange(newQueryObj)
    },
    // eslint-disable-next-line
    [onChange]
  )

  return (
    <div className={classes['container']}>
      <NavFilterDropdown options={sort} defaultValues={animeValues?.sort || ['Popularity']} type='sort' onChange={onChangeHandler} timeout={0} altSelect />
      <div className={classes['break']} />
      <NavFilterDisplay />
    </div>
  )
}

export default NavSort
