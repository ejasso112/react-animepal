// Import Custom Components
import CardReview from '../Cards/CardReview'
// Import Styles
import classes from './Section.module.scss'

//* Reviews Section Component
const SectionReviews = (
  props = {
    reviews: {}, // --- id of youtube video
  }
) => {
  // Destructuring Props

  const { reviews } = { ...props }
  //* Render empty fragment if there are no Reviews
  if (!reviews || !reviews[0]?.id) {
    return <></>
  }

  // Map to store all review elements
  const reviewsMap = reviews.map((review) => {
    return <CardReview key={review.id} avatarImg={review?.user?.avatar?.medium} summary={review.summary} />
  })

  //* Render Reviews Section
  return (
    <div className={classes['container']}>
      <h3 className={classes['heading']}>Reviews</h3>
      <div className={classes['content']}>{reviewsMap}</div>
    </div>
  )
}

export default SectionReviews
