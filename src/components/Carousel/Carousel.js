// Import React Dependencies
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
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

  // State to keep track if carousel transition is true or false
  const [isSliding, setIsSliding] = useState(false)
  // State to keep track of the direction carousel should slide
  const [direction, setDirection] = useState('left')

  // TODO Render: Loading Banner
  if (data.length === 0) {
    return <div>Is Loading</div>
  }

  // Handles the onClink next button
  const onNextHandler = () => {
    // Direction the transition should be
    setDirection('right')

    // Timeout to allow direction state to change before transition starts
    setTimeout(() => {
      // Increment the current page
      currPage < totalPages ? setCurrPage((prevCurrPage) => prevCurrPage + 1) : setCurrPage(1)

      // Set isSliding to true then to false after tansition is complete (transition lasts 1000ms)
      setIsSliding(true)
      setTimeout(() => {
        setIsSliding(false)
      }, 1000)
    })
  }

  // Handles the onClink prev button
  const onPrevHandler = () => {
    // Direction the transition should be
    setDirection('left')

    // Timeout to allow direction state to change before transition starts
    setTimeout(() => {
      // Decrement the current page
      currPage > 1 ? setCurrPage((prevCurrPage) => prevCurrPage - 1) : setCurrPage(totalPages)

      // Set isSliding to true then to false after tansition is complete (transition lasts 1000ms)
      setIsSliding(true)
      setTimeout(() => {
        setIsSliding(false)
      }, 1000)
    })
  }

  // Creating Button Map for Banner Buttons
  const totalPagesArr = [...Array(totalPages).keys()]
  const buttonsMap = totalPagesArr.map((item, i) => {
    const isActive = i + 1 === currPage ? styles['shared__carousel__button--active'] : ''
    return <div className={`${styles['shared__carousel__button']} ${isActive}`} key={i} onClick={() => setCurrPage(i + 1)}></div>
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

  // Class to be added while Carousel is transitioning
  const freezeActionsClass = isSliding ? styles['carousel__freeze'] : ''

  // Render: Loaded Banner
  return (
    <div className={styles['carousel__container']}>
      <div className={styles['carousel']}>
        <div className={styles['carousel__heading']}>
          <h3 className={styles['carousel__heading__title']}>
            <Link className={`${styles['carousel__heading__link']} ${styles['shared__carousel__viewMore']}`} to={{ pathname: '/search', search: `?type=${type}&sort=${sort}` }}>
              {title}
              <span>Veiw More</span>
            </Link>
          </h3>
          <div className={`${styles['carousel__buttons']} ${styles['shared__carousel__buttons']}`}>{buttonsMap}</div>
        </div>
        <div className={`${styles['carousel__body']} ${freezeActionsClass}`}>
          <div className={styles['carousel__prev']} onClick={onPrevHandler} tabIndex='0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
            </svg>
          </div>
          <TransitionGroup className={styles['carousel__items__container']}>
            <CSSTransition
              key={currPage}
              timeout={1000}
              className={`${styles['carousel__items']}`}
              classNames={{
                enter: styles[`slide__enter`],
                exitActive: styles[`slide__exit__active--${direction}`],
              }}
            >
              <div>
                {prevPageList}
                {currPageList}
                {nextPageList}
              </div>
            </CSSTransition>
          </TransitionGroup>
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
