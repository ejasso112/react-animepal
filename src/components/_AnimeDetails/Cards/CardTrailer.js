// Import Styles
import styles from './CardTrailer.module.scss'

//* Trailer Card Component
const CardTrailer = (
  props = {
    id: '', // --- id of youtube video
    site: '', // - site of video
  }
) => {
  // Deconstructing Props
  const { id, site } = { ...props }

  // Varible holding url to trailer
  const trailer = `https://www.${site}.com/embed/${id}`

  // Render Trailer
  return (
    <div className={styles['cardTrailer']}>
      <iframe className={styles['cardTrailer__video']} title='trailer' src={trailer} frameBorder='0' enablejsapi='1' allowFullScreen='allowFullscreen' />
    </div>
  )
}

export default CardTrailer
