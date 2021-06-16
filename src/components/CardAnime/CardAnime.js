// Import React Dependencies
import { Link } from 'react-router-dom'
// Import Styles
import componentStyles from './CardAnime.module.scss'
import sharedStyles from '../SharedStyles.module.scss'
// Combined Styles
const styles = { ...sharedStyles, ...componentStyles }

const CardAnime = (
  props = {
    id: NaN, // ----------- card id
    type: '', // ---------- anime/manga
    title: '', // --------- title of Card
    coverImage: '', // ---- url for Card Image
    totalItems: NaN, // --- total number of Cards in Carousel
    isCurr: true, // ------ is item in current page
  }
) => {
  // Destructuring Props
  const { id, type, title, coverImage, totalItems, isCurr } = props

  // TODO Render: Loading Banner
  if (!id) {
    return <div>Is Loading</div>
  }

  const animeTitle = title?.english ? title?.english : title?.romaji
  const animeImg = coverImage?.large

  if (!isCurr) {
    return (
      <div className={`${styles['cardAnime__container']} ${styles[`cardAnime__items--${totalItems}`]}`}>
        <div className={styles['cardAnime']}>
          <img className={styles['cardAnime__img']} src={animeImg} alt={animeTitle} />
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles['cardAnime__container']} ${styles[`cardAnime__items--${totalItems}`]}`}>
      <Link to={`/${type}/${id}/${animeTitle.replaceAll(' ', '-')}`} className={styles['cardAnime']}>
        <img className={styles['cardAnime__img']} src={animeImg} alt={animeTitle} />
        <h4 className={styles['cardAnime__title']}>{animeTitle}</h4>
      </Link>
    </div>
  )
}

export default CardAnime
