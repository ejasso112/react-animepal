import SectionTrailer from '../../components/Sections/SectionTrailer'
import SectionReviews from '../../components/Sections/SectionReviews'
//* Overview Component
const Overview = (
  props = {
    trailer: { id: NaN, site: NaN },
    reviews: { id: NaN, summary: '', user: { avatar: { medium: '' } } },
  }
) => {
  // Destructuring Props
  const { trailer, reviews } = { ...props }

  //* Render Overview
  return (
    <div>
      <SectionTrailer {...trailer} />
      <SectionReviews reviews={reviews} />
    </div>
  )
}

export default Overview
