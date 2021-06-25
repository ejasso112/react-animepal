// Import Styles
import classes from './carouselButtons.module.scss'

//* Carousel Buttons Component
const CarouselButtons = (
  props = {
    totalPages: NaN, // ------------------------ total amount of pages
    currPage: NaN, // -------------------------- current page
    setCurrPage: (newCurrPage = NaN) => {}, // - set new current page
  }
) => {
  // Destructuring Props
  const { className, totalPages, currPage, setCurrPage } = { ...props }

  // Handler for when Button is clicked
  const onButtonClickHandler = (newCurrPage) => {
    setCurrPage(newCurrPage)
  }

  // Creating Button Map for Banner Buttons
  const totalPagesArr = [...Array(totalPages)]
  const buttonsMap = totalPagesArr.map((item, i) => {
    const isButtonActive = i + 1 === currPage
    const activeClass = isButtonActive ? classes['button--active'] : ''
    return <div className={`${classes['button']} ${activeClass}`} key={i + 1} onClick={() => onButtonClickHandler(i + 1)} />
  })

  //* Render Buttons
  return <div className={`${classes['buttons']} ${className || ''}`}>{buttonsMap}</div>
}

export default CarouselButtons
