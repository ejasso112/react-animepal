// Import React Dependancies
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
//Import Helpers
import { getQueryObject } from '../../services/utilities'
// Import Custom Component
import NavFilterDropdown from './navFilterDropdown'
//Import Styles
import classes from './NavSort.module.scss'

const NavSort = (props) => {
  // Destructuring Props
  const { onChange } = { ...props }
  // Variable to hold location search query string
  const queryString = useLocation().search
  // Variable to hold the default values object
  const defaultValues = getQueryObject(queryString)

  // Array of Sort options
  const sort = ['Title', 'Popularity', 'Average Score', 'Trending', 'Favorites', 'Date Added', 'Release Date']

  // Handler for when some value is changed in the child components through onChange prop
  const onChangeHandler = useCallback(
    (val, type) => {
      // Varibale to hold copy of default values
      let newQueryObj = { ...defaultValues }
      // Removes key value pair of key type
      delete newQueryObj[type]

      // Add deleted type(key) with new values to object if value no empty array
      newQueryObj = val.length > 0 ? { ...newQueryObj, [type]: val } : { ...newQueryObj, [type]: ['Popularity'] }

      // Call onChange method passed by props from parent component
      onChange(newQueryObj)
    },
    // eslint-disable-next-line
    [onChange]
  )

  return (
    <div className={classes['container']}>
      <NavFilterDropdown options={sort} defaultValues={defaultValues?.sort || ['Popularity']} type='sort' onChange={onChangeHandler} timeout={0} altSelect />
    </div>
  )
}

export default NavSort
