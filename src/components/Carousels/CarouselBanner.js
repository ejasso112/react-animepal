// Import React Dependencies
import { Link } from 'react-router-dom'
// Import Custom Components
import CarouselInterval from './carouselInterval'
import CarouselButtons from './carouselButtons'
import CarouselLinkHeading from './carouselLinkHeading'
// Import Helpers
import { getParsedHTML } from '../../services/utilities'
// Import Styles
import classes from './CarouselBanner.module.scss'

//* Carousel Banner Component
const CarouselBanner = (
  props = {
    heading: '', // --------------------------- heading of Banner
    to: {}, // -------------------------------- react router to object
    type: '', // ------------------------------ anime/manga
    data: [], // ------------------------------ page of Banner Data
    currPage: NaN, // ------------------------- active page
    setCurrPage: (newCurrPage = NaN) => {}, //- changes currPage to newCurrPage
    totalPages: NaN, // ----------------------- number of pages
    interval: NaN, // ------------------------- duration per item in ms
  }
) => {
  // Destructuring Props
  const { heading, to, type, data, currPage, setCurrPage, totalPages, interval } = { ...props }

  // Variable with current page data from the data array
  const currItemData = data[currPage - 1]

  // TODO Render when Carousel Banner is loading
  if (data.length === 0) {
    return <div>Is Loading</div>
  }

  // Destructuring currItem
  const { id, title, bannerImage, coverImage, description } = { ...currItemData }
  // Destructuring title
  const { english, native, romaji, userPreferred } = { ...title }
  // Destructuring coverImage
  const { extraLarge, large, medium } = { ...coverImage }

  // Varibales to store anime title and banner img
  const animeTitle = english ? english : userPreferred ? userPreferred : romaji ? romaji : native
  const bannerImg = bannerImage ? bannerImage : extraLarge ? extraLarge : large ? large : medium

  // Props Object for Carousel Interval
  const carouselIntervalProps = {
    interval: interval,
    totalPages: totalPages,
    currPage: currPage,
    setCurrPage: setCurrPage,
  }

  // Props Object for Carousel Heading Link
  const carouselLinkHeadingProps = {
    heading: heading,
    message: 'Veiw All',
    to: to,
  }

  // Props Object for Carousel Buttons
  const carouselButtonsProps = {
    totalPages: totalPages,
    currPage: currPage,
    setCurrPage: setCurrPage,
  }

  //* Render Banner
  return (
    <CarouselInterval className={classes['container']} {...carouselIntervalProps}>
      <div className={classes['banner']}>
        <div className={classes['background']}>
          <img className={classes['background__img']} src={bannerImg} alt={animeTitle} />
          <div className={classes['background__overlay']} />
        </div>

        <div className={classes['content']}>
          <CarouselLinkHeading className={classes['content__heading']} {...carouselLinkHeadingProps} />
          <h3 className={classes['content__title']}>{animeTitle}</h3>
          <p className={classes['content__description']}>{getParsedHTML(description)}</p>
          <Link className={classes['content__link']} to={{ pathname: `/${type}/${id}` }}>
            View&ensp;▶
          </Link>
        </div>
      </div>
      <CarouselButtons className={classes['buttons']} {...carouselButtonsProps} />
    </CarouselInterval>
  )
}

export default CarouselBanner
