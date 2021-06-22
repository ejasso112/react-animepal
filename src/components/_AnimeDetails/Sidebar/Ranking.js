// Import React Depenedancies
import { Link } from 'react-router-dom'
// Import Assets
import Star from '../../../assets/Star'
import Heart from '../../../assets/Heart'
// Import Styles
import styles from './Ranking.module.scss'

//* Ranking Component
const Ranking = (
  props = {
    rank: undefined, // -------- rank to be diplayed
    preContext: '', // -- content to be displayed before rank
    postContext: '', // - content to be displayed after rank
    type: '', // -------- anime,manga
    sort: '', // -------- method that should be used to sort
    svg: '', // --------- star/heart
  }
) => {
  // Deconstructing Porps
  let { rank, preContext, postContext = '', type, sort, svg } = props
  // Preventing preContext from being undefined
  preContext = preContext === undefined ? '' : preContext

  // Varible holding svg component Star or Heart
  const svgImg = svg === 'star' ? <Star className={`${styles['ranking__svg']} ${styles['ranking__svg--star']}`} /> : svg === 'heart' ? <Heart className={`${styles['ranking__svg']} ${styles['ranking__svg--heart']}`} /> : <></>

  //Render empty fragrment if rank variable is empty
  if (!rank) {
    return <></>
  }

  // Varible holding the content that should be a div or link
  const rankingContent = (
    <>
      {svgImg}
      <span className={styles['ranking__content']}>{`${preContext}${rank}${postContext}`}</span>
    </>
  )

  // If sort is undefined then redular div should be rendered
  if (sort === undefined) {
    return <div className={styles['ranking']}>{rankingContent}</div>
  }

  // Render Link to route to search
  return (
    <Link className={`${styles['ranking']} ${styles['ranking--link']}`} to={{ pathname: '/search', search: `?type=${type}&sort=${sort}` }}>
      {rankingContent}
    </Link>
  )
}

export default Ranking
