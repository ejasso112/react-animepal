import { useLocation } from 'react-router-dom'
import Tags from '../../assets/Tags'
import classes from './NavTags.module.scss'

const setQueryString = (queryString) => {
  const parsedQuery = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  const queryObj = { genres: [], year: [], season: [], format: [], status: [], yearRange: [], episodesRange: [], durationRange: [] }
  const { genres, year, season, format, status, yearRange, episodesRange, durationRange } = { ...queryObj }

  for (let i = 0; i < parsedQuery.length; i++) {
    let [key, value] = [...parsedQuery[i].split('=')]
    queryObj[key].push(value)
  }
  const query = [...genres, ...year, ...season, ...format, ...status, yearRange[0] && `Year Range: ${yearRange[0]} - ${yearRange[1]}`, episodesRange[0] && `Episodes: ${episodesRange[0]} - ${episodesRange[1]}`, durationRange[0] && ` Duration: ${durationRange[0]} - ${durationRange[1]}`]
  const formattedQuery = query.filter((item) => item && item)
  return formattedQuery
}

const NavTags = (props) => {
  const location = useLocation()

  const tags = location.search && setQueryString(location.search)
  const tagsMap =
    tags &&
    tags.map((tag, i) => (
      <div key={i} className={classes['tag']}>
        {tag} &ensp;
        <svg className={classes['x']} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
        </svg>
      </div>
    ))
  return (
    <div className={classes['container']}>
      <Tags className={classes['svg']} />
      <div className={classes['tags']}>{tagsMap}</div>
    </div>
  )
}

export default NavTags
