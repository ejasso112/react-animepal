// Import React Depenedancies
import { Link } from 'react-router-dom'
// Import Assets
import Star from '../../assets/Star'
import Heart from '../../assets/Heart'
// Import Styles
import classes from './sidebarRanking.module.scss'

//* Ranking Component
const SidebarRanking = (
  props = {
    rank: undefined, // -------- rank to be diplayed
    preContext: '', // -- content to be displayed before rank
    postContext: '', // - content to be displayed after rank
    type: '', // -------- anime,manga
    sort: '', // -------- method that should be used to sort
    svg: '', // --------- star/heart
  }
) => {
  // Destructuring Porps
  let { rank, preContext, postContext = '', type, sort, svg } = { ...props }

  // Varible holding svg component Star or Heart
  const svgImg = svg === 'star' ? <Star className={`${classes['ranking__svg']} ${classes['ranking__svg--star']}`} /> : svg === 'heart' ? <Heart className={`${classes['ranking__svg']} ${classes['ranking__svg--heart']}`} /> : <></>

  //* Render empty fragrment if rank variable is empty
  if (!rank) {
    return <></>
  }

  // Varible holding the content that should be a div or link
  const rankingContent = (
    <>
      {svgImg}
      <span className={classes['ranking__content']}>{`${preContext || ''}${rank}${postContext}`}</span>
    </>
  )

  //* Rendered div is sort property is undefined
  if (sort === undefined) {
    return <div className={classes['ranking']}>{rankingContent}</div>
  }

  //* Render Link
  return (
    <Link className={`${classes['ranking']} ${classes['ranking--link']}`} to={{ pathname: '/search', search: `?type=${type}&sort=${sort}` }}>
      {rankingContent}
    </Link>
  )
}

export default SidebarRanking
