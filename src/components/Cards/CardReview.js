// Import Styles
import classes from './CardReview.module.scss'

//* Review Card Component
const CardReview = (props = { avatarImg: '', summary: '' }) => {
  // Destructuring Props
  const { avatarImg, summary } = { ...props }

  return (
    <div className={classes['container']}>
      <div className={classes['avatar']}>
        <img className={classes['avatar__content']} src={avatarImg} alt='avatar' />
      </div>
      <p className={classes['summary']}>{summary}</p>
    </div>
  )
}

export default CardReview
