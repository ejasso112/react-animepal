// Import React Dependencies
import { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// Import Custom Components
import CarouselArrows from './carouselArrows'
import CarouselButtons from './carouselButtons'
import CarouselLinkHeading from './carouselLinkHeading'
import CardAnime from '../Cards/CardAnime'
// Import Styles
import classes from './_CarouselSlider.module.scss'

//* Carousel Slider Component
const CarouselSlider = (
  props = {
    type: '', // --------------------------------- anime/manga
    sort: '', // --------------------------------- trending_desc/popular_desc/...
    title: '', // -------------------------------- title of Carousel
    data: [], // --------------------------------- array of Caorusel data
    perPage: NaN, // ----------------------------- items per Carousel page
    currPage: NaN, // ---------------------------- active page
    setCurrPage: (newCurrPage = NaN) => {}, // --- changes currPage to newCurrPage
    totalPages: NaN, // -------------------------- total amount of pages
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

  // Props Object for Carousel Arrows component
  const carouselArrowsProps = {
    isLastPage: currPage !== totalPages,
    isFirstPage: currPage !== 1,
    isSliding: isSliding,
    currPage: currPage,
    totalPages: totalPages,
    duration: 1000,
    setDirection: setDirection,
    setCurrPage: setCurrPage,
    setIsSliding: setIsSliding,
  }

  //* Render Carousel Banner
  return (
    <div className={classes['container']}>
      <div className={classes['heading']}>
        <CarouselLinkHeading heading={title} message='View All' to={{ pathname: '/search', search: `?type=${type}&sort=${sort}` }} />
        <CarouselButtons className={classes['heading__buttons']} totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />
      </div>

      <CarouselArrows className={classes['content__arrows']} {...carouselArrowsProps}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={currPage}
            timeout={1000}
            classNames={{
              enter: classes[`slide__enter`],
              exitActive: classes[`slide__exit--${direction}`],
            }}
          >
            <div className={`${classes['content__items']}`}>
              {prevPageList}
              {currPageList}
              {nextPageList}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </CarouselArrows>
    </div>
  )
}

export default CarouselSlider
