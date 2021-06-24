// Import styles
import classes from './carouselArrows.module.scss'

//* Carousel Arrows Component
const CarouselArrows = (
  props = {
    isSliding: false, // --------------------------- is carousel sliding
    currPage: NaN, // ------------------------------ current page number
    totalPages: NaN, // ---------------------------- number of the last page
    duration: NaN, // ------------------------------ how long is the transition
    setDirection: (newDirection = '') => {}, // ---- se the new direction left/right
    setCurrPage: (newCurrPage = NaN) => {}, // ----- set the new current page number
    setIsSliding: (newIsSliding = false) => {}, // - change the sliding state
  }
) => {
  // Destructuring Props
  const { className, children, isSliding, currPage, totalPages, duration, setDirection, setCurrPage, setIsSliding } = { ...props }

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
      }, duration)
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
      }, duration)
    })
  }

  // Class to be added while Carousel is transitioning
  const freezeClass = isSliding ? classes['freeze'] : ''

  //* Render Arrows
  return (
    <div className={`${classes['container']} ${freezeClass}`}>
      <div className={classes['prev']} onClick={onPrevHandler} tabIndex='0'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path className={className || ''} d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
        </svg>
      </div>
      {children}
      <div className={classes['next']} onClick={onNextHandler} tabIndex='0'>
        <svg className={className || ''} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
        </svg>
      </div>
    </div>
  )
}

export default CarouselArrows
