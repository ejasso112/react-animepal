// Import Styles
import componentStyles from './Banner.module.scss'
import sharedStyles from '../../SharedStyles.module.scss'
// Combined Styles
const styles = { ...sharedStyles, ...componentStyles }

const Banner = (
  props = {
    id: NaN, // ----------------------------------------------------------- id used to identify Anime
    bannerImage: '', // --------------------------------------------------- url to display as banner
    coverImage: { medium: '', large: '', extraLarge: '', color: '' }, // -- cover image object with multiple size formats
    title: { english: '', native: '', romaji: '', userPreferred: '' }, // - title object with multiple languages
    description: '', // --------------------------------------------------- string of anime synopsis/description
  }
) => {
  // Deconstructing Props
  const { id, bannerImage, coverImage, title, description } = props
  const stats = [
    { stat: 'Score', rank: '84%' },
    { stat: 'Ranked', rank: '#321' },
    { stat: 'Popularity', rank: '#543' },
    { stat: 'Members', rank: '342,234' },
  ]

  // TODO Render: Loading Banner
  if (id === undefined) {
    return <div>Loading</div>
  }

  const statsMap = stats.map((stat) => (
    <div className={styles['stats__stat']} key={stat.stat}>
      <span className={styles['stats__name']}>{stat.stat}:</span>
      <span className={styles['stats__rank']}>{stat.rank}</span>
    </div>
  ))

  return (
    <div className={styles['banner__container']}>
      <div className={styles['banner']}>
        <img className={styles['banner__image']} src={bannerImage} alt={`Banner of ${title.userPreferred}`} />
        <div className={styles['banner__overlay']} />
      </div>
      <div className={styles['banner']}>
        <div className={styles['banner__content']}>
          <img className={styles['banner__coverImage']} src={coverImage.extraLarge} alt={title.userPreferred} />
          <h1 className={styles['banner__title']}>{title.userPreferred}</h1>
          <p className={styles['banner__description']} dangerouslySetInnerHTML={{ __html: description }} />
          {/* <div className={styles['stats']}>{statsMap}</div> */}
        </div>
      </div>
    </div>
  )
}

export default Banner
