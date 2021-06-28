// Import Custom Components
import CardTrailer from '../Cards/CardTrailer'
// Import Styles
import classes from './Section.module.scss'

//* Trailer Section Component
const SectionTrailer = (
  props = {
    id: '', // --- id of youtube video
    site: '', // - site of video
  }
) => {
  // Destructuring Props
  const { id, site } = { ...props }

  //* Render empty fragment if there is no Trailer
  if (!site || site !== 'youtube') {
    return <></>
  }

  // Props Object for CardTrailer
  const cardTrailerProps = {
    id: id,
    site: site,
  }

  //* Render Trailer Section
  return (
    <div className={classes['container']}>
      <h3 className={classes['heading']}>Trailer</h3>
      <div className={classes['content']}>
        <CardTrailer {...cardTrailerProps} />
      </div>
    </div>
  )
}

export default SectionTrailer
