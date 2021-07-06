import { useLocation } from 'react-router-dom'
import Tags from '../../assets/Tags'
import { getQueryObject } from '../../services/utilities'
import classes from './NavTags.module.scss'

const setQueryString = (queryString) => {
  const parsedQuery = getQueryObject(queryString)

  const query = []
  for (const [key, values] of Object.entries(parsedQuery)) {
    if (key === 'yearRange') query.push([key, `Year Range: ${values[0]} - ${values[1]}`])
    else if (key === 'episodeRange') query.push([key, `Episodes: ${values[0]} - ${values[1]}`])
    else if (key === 'durationRange') query.push([key, `Duration: ${values[0]} - ${values[1]}`])
    else if (key === 'hentai') query.push([key, 'Hentai'])
    else values.map((value) => query.push([key, value]))
  }

  return query
}

const NavTags = (props) => {
  const { onChange } = { ...props }
  const location = useLocation().search

  const onChangeHandler = (option, type) => {
    const queryObj = getQueryObject(location)

    if (queryObj[type].length > 1 && type !== 'yearRange' && type !== 'episodeRange' && type !== 'durationRange') queryObj[type] = queryObj[type].filter((value) => value !== option)
    else delete queryObj[type]
    onChange && onChange(queryObj)
  }

  const tags = setQueryString(location)
  const tagsMap =
    tags &&
    tags.map((tag, i) => (
      <div key={i} className={classes['tag']} onClick={() => onChangeHandler(tag[1], tag[0])}>
        {tag[1]} &ensp;
        <svg className={classes['x']} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
        </svg>
      </div>
    ))

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
