// Import Styles
import classes from './CardTrailer.module.scss'

//* Trailer Card Component
const CardTrailer = (
  props = {
    id: '', // --- id of youtube video
    site: '', // - site of video
  }
) => {
  // Destructuring Props
  const { id, site } = { ...props }

  // Varible holding url to trailer
  const trailer = `https://www.${site}.com/embed/${id}`

  //* Render Trailer
  return (
    <div className={classes['container']}>
      <iframe className={classes['video']} title='trailer' src={trailer} frameBorder='0' enablejsapi='1' allowFullScreen='allowFullscreen' />
    </div>
  )
}

export default CardTrailer
