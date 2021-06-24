// Import React Dependancies
import { Link } from 'react-router-dom'
// Import Styles
import classes from './carouselLinkHeading.module.scss'

//* Carousel Heading Link Component
const CarouselLinkHeading = (
  props = {
    heading: '', // - link heading
    message: '', // - message to display when hovered
    to: {}, // ------ object with Link to
  }
) => {
  // Destructuring Props
  const { className, heading, message, to } = { ...props }

  //* Render Link
  return (
    <h2 className={`${classes['container']} ${className || ''}`}>
      <Link to={to}>
        {heading}
        <span className={classes['message']}>{message}</span>
      </Link>
    </h2>
  )
}

export default CarouselLinkHeading
