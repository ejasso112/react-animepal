// Import React Dependancies
import { useLocation } from 'react-router-dom'
// Import Assets
import Tags from '../../assets/Tags'
// Import Helpers
import { getQueryObject, getQueryArray } from '../../services/utilities'
// Import Styles
import classes from './NavTags.module.scss'

//* Nav Tags Component
const NavTags = (
  props = {
    onChange: (values = {}) => {}, // - function to perform when values change
  }
) => {
  // Destructuring Props
  const { onChange } = { ...props }
  // Variable to hold location search query string
  const queryString = useLocation().search
  // Variable to hold the query object
  const queryObj = getQueryObject(queryString)
  // Variable to hold the query tags array
  const tags = getQueryArray(queryString)

  // Handler for when some value is changed in the child elements through onClick
  const onChangeHandler = (option, type) => {
    // Varibale to hold copy of query object
    const queryObjCopy = { ...queryObj }
    // If type(key) has more than one value filter out the value the option that was clicked
    if (queryObjCopy[type].length > 1 && type !== 'yearRange' && type !== 'episodeRange' && type !== 'durationRange') queryObjCopy[type] = queryObjCopy[type].filter((value) => value !== option)
    // else delete type(key) value pair
    else delete queryObjCopy[type]

    // Call onChange method passed by props from parent component
    onChange && onChange(queryObjCopy)
  }

  // Map to hold a tag elements to display
  const tagsMap = tags.map((tag, i) => (
    <div key={i} className={classes['tag']} onClick={() => onChangeHandler(tag[1], tag[0])}>
      {tag[1]} &ensp;
      <svg className={classes['x']} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
      </svg>
    </div>
  ))

  //* Render Nav Tags
  return tags.length > 0 ? (
    <div className={classes['container']}>
      <Tags className={classes['svg']} />
      <div className={classes['tags']}>{tagsMap}</div>
    </div>
  ) : (
    <></>
  )
}

export default NavTags
