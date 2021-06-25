// Import Helpers
import { getParsedHTML } from '../../services/utilities'
// Import Styles
import classes from './BannerAnime.module.scss'

//* Anime Banner Container
const BannerAnime = (
  props = {
    id: NaN, // ----------------------------------------------------------- id used to identify Anime
    coverImage: { medium: '', large: '', extraLarge: '' }, // ------------- cover image object with multiple size formats
    title: { english: '', native: '', romaji: '', userPreferred: '' }, // - title object with multiple languages
    description: '', // --------------------------------------------------- string of anime synopsis/description
  }
) => {
  // Destructuring Props
  const { id, coverImage, title, description } = { ...props }
  // Destructuring title
  const { english, native, romji, userPreferred } = { ...title }
  // Destructuring coverImage
  const { extraLarge, large, medium } = { ...coverImage }

  // TODO Render when Card is loading
  if (!id) {
    return <div>Is Loading</div>
  }

  // Varibales to store anime title and img
  const animeTitle = english ? english : userPreferred ? userPreferred : romji ? romji : native
  const animeImg = extraLarge ? extraLarge : large ? large : medium

  //* Render Anime Banner
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <div className={classes['coverImage']}>
          <img className={classes['coverImage__content']} src={animeImg} alt={animeTitle} />
        </div>
        <h2 className={classes['title']}>{animeTitle}</h2>
        <p className={classes['description']}>{getParsedHTML(description)}</p>
      </div>
    </div>
  )
}

export default BannerAnime
