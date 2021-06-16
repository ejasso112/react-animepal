// Import React Dependencies
import { Link } from 'react-router-dom'
// Import Custom Components
import CardAnime from '../../components/CardAnime/CardAnime'
// Import Styles
import componentStyles from './Carousel.module.scss'
import sharedStyles from '../SharedStyles.module.scss'
// Combined Styles
const styles = { ...sharedStyles, ...componentStyles }

//* Carousel Component
const Carousel = (
  props = {
    type: '', // --------------------------------- anime/manga
    sort: '', // --------------------------------- trending_desc/popular_desc/...
    title: '', // -------------------------------- title of Carousel,
    data: [], // --------------------------------- array of Caorusel Data
    perPage: NaN, // ----------------------------- items per Carousel Page,
    currPage: NaN, // ---------------------------- active Page,
    setCurrPage: (newCurrPage = NaN) => {}, // --- changes currPage to newCurrPage,
    totalPages: NaN, // -------------------------- total Amount of Pages,
  }
) => {
  // Destructuring Props
  const { type, sort, title, data, perPage, currPage, setCurrPage, totalPages } = props

  // TODO Render: Loading Banner
  if (data.length === 0) {
    return <div>Is Loading</div>
  }

  // Handles the onClink next button
  const onNextHandler = () => {
    currPage < totalPages ? setCurrPage((prevCurrPage) => prevCurrPage + 1) : setCurrPage(1)
  }

  // Handles the onClink prev button
  const onPrevHandler = () => {
    currPage > 1 ? setCurrPage((prevCurrPage) => prevCurrPage - 1) : setCurrPage(totalPages)
  }

  // Creating Button Map for Banner Buttons
  const totalPagesArr = [...Array(totalPages).keys()]
  const buttonsMap = totalPagesArr.map((item, i) => {
    const isActive = i + 1 === currPage ? styles['carousel__button--active'] : ''
    return <div className={`${styles['carousel__button']} ${isActive}`} key={i} onClick={() => setCurrPage(i + 1)}></div>
  })

  // Variables holding prev and next page values
  const prevPageNumber = currPage === 1 ? totalPages : currPage - 1
  const nextPageNumber = currPage === totalPages ? 1 : currPage + 1

  // Map of Prev Page Items
  const prevPageList = data.slice(perPage * (prevPageNumber - 1), perPage * prevPageNumber).map((item, i) => {
    const itemId = item.id ? item.id : i
    return <CardAnime id={item.id} type={type} title={item.title} coverImage={item.coverImage} currItemPos={i + 1} totalItems={perPage} key={itemId} isCurr={false} />
  })

  // Map of Curr Page Items
  const currPageList = data.slice(perPage * (currPage - 1), perPage * currPage).map((item, i) => {
    const itemId = item.id ? item.id : i
    return <CardAnime id={item.id} type={type} title={item.title} coverImage={item.coverImage} currItemPos={i + 1} totalItems={perPage} key={itemId} isCurr={true} />
  })

  // Map of Next Page Items
  const nextPageList = data.slice(perPage * (nextPageNumber - 1), perPage * nextPageNumber).map((item, i) => {
    const itemId = item.id ? item.id : i
    return <CardAnime id={item.id} type={type} title={item.title} coverImage={item.coverImage} currItemPos={i + 1} totalItems={perPage} key={itemId} isCurr={false} />
  })

  // Render: Loaded Banner
  return (
    <div className={styles['carousel__container']}>
      <div className={styles['carousel']}>
        <div className={styles['carousel__heading']}>
          <h3 className={styles['carousel__heading__title']}>
            <Link className={`${styles['carousel__heading__link']} ${styles['carousel__viewMore']}`} to={{ pathname: '/search', search: `?type=${type}&sort=${sort}` }}>
              {title}
              <span>Veiw More</span>
            </Link>
          </h3>
          <div className={styles['carousel__buttons']}>{buttonsMap}</div>
        </div>
        <div className={styles['carousel__items']}>
          <div className={styles['carousel__prev']} onClick={onPrevHandler} tabIndex='0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
            </svg>
          </div>
          {prevPageList}
          {currPageList}
          {nextPageList}
          <div className={styles['carousel__next']} onClick={onNextHandler} tabIndex='0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
