// Import Custom Components
import CardTrailer from '../Cards/CardTrailer'
// Import Styles
import styles from './Section.module.scss'

//* Trailer Section Component
const SectionTrailer = (
  props = {
    id: '', // --- id of youtube video
    site: '', // - site of video
  }
) => {
  // Deconstructing Props
  const { id, site } = props

  //! Render empty fragment if there is no Trailer
  if (!site || site !== 'youtube') {
    return <></>
  }

  // Props Object for CardTrailer
  const cardTrailerProps = {
    id: id,
    site: site,
  }

  // Render Trailer Section
  return (
    <div className={styles['section']}>
      <h2 className={styles['section__heading']}>Trailer:</h2>
      <div className={styles['section__content']}>
        <CardTrailer {...cardTrailerProps} />
      </div>
    </div>
  )
}

export default SectionTrailer
