// Import React Dependencies
import { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Styles
import classes from './CardAnime.module.scss'

//* Anime Card
const CardAnime = (
  props = {
    id: NaN, // ----------------------------------------------------------- card id
    type: '', // ---------------------------------------------------------- anime/manga
    title: { english: '', native: '', romaji: '', userPreferred: '' }, // - object that holds titles of Card in different languages
    coverImage: { medium: '', large: '', extraLarge: '', color: '' }, // -- object that holds url to differnt sized img urls and hex color
    color: '', // --------------------------------------------------------- hex color
    totalItems: NaN, // --------------------------------------------------- total number of Cards in Carousel
    isCurr: true, // ------------------------------------------------------ is item in current page
    isAlt: false, // ------------------------------------------------------ is item in alt style
  }
) => {
  // Destructuring Props
  const { id, type, title, coverImage, totalItems, isCurr, isAlt } = { ...props }
  // Destructuring title
  const { english, native, romji, userPreferred } = { ...title }
  // Destructuring coverImage
  const { extraLarge, large, medium, color } = { ...coverImage }

  // Creating state to track if component is being hovered
  const [isActive, setIsActive] = useState(false)

  // TODO Render when Card is loading
  if (!id) {
    return <div>Is Loading</div>
  }

  // State handlers for when events are triggered
  const onMouseEnterHandler = () => setIsActive(true)
  const onMouseLeaveHandler = () => setIsActive(false)

  // Varibales to store anime title and img
  const animeTitle = english ? english : userPreferred ? userPreferred : romji ? romji : native
  const animeImg = extraLarge ? extraLarge : large ? large : medium

  // Variable to store inline style object for title when active
  const activeStyle = isActive ? { color: color ? color : '#2c76a0' } : {}
  const altClass = isAlt ? classes['card--alt'] : ''

  //* Render when Card is not part of the current page
  if (!isCurr) {
    return (
      <div className={`${classes['container']} ${classes[`items--${totalItems}`]} ${classes['inactive']}`}>
        <div className={`${classes['card']} ${altClass}`}>
          <div className={classes['img']}>
            <img className={classes['img__content']} src={animeImg} alt={animeTitle} />
          </div>
        </div>
      </div>
    )
  }

  //* Render Card
  return (
    <div className={`${classes['container']} ${classes[`items--${totalItems}`]}`} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} onFocus={onMouseEnterHandler} onBlur={onMouseLeaveHandler}>
      <Link to={`/${type}/${id}/${animeTitle.replaceAll(' ', '_')}`} className={`${classes['card']} ${altClass}`}>
        <div className={classes['img']}>
          <img className={classes['img__content']} src={animeImg} alt={animeTitle} />
        </div>
        <span className={classes['title']} style={activeStyle}>
          {animeTitle}
        </span>
      </Link>
    </div>
  )
}

export default CardAnime
