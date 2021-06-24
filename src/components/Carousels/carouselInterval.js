// Import React Dependancies
import { useEffect } from 'react'

//* Carousel Interval Component
const CarouselInterval = (
  props = {
    interval: NaN, // -------------------------- time in ms
    totalPages: NaN, // ------------------------ total amount of pages
    currPage: NaN, // -------------------------- current page
    setCurrPage: (newCurrPage = NaN) => {}, // - set new current page
  }
) => {
  // Destructuring Props
  const { className, children, interval, currPage, totalPages, setCurrPage } = { ...props }

  // Interval Handler for render time per item in list
  useEffect(() => {
    const intervalHandler = setInterval(() => {
      currPage < totalPages ? setCurrPage((prevCurrPage) => prevCurrPage + 1) : setCurrPage(1)
    }, interval)

    return () => clearInterval(intervalHandler)
  }, [interval, currPage, totalPages, setCurrPage])

  //* Commense Interval
  return <div className={className}>{children}</div>
}

export default CarouselInterval
