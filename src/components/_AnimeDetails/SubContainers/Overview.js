import SectionTrailer from '../Sections/SectionTrailer'

//* Overview Component
const Overview = (props = { trailer: { id: NaN, site: NaN } }) => {
  // Deconstructing Props
  const { trailer } = { ...props }

  return (
    <div>
      <SectionTrailer {...trailer} />
    </div>
  )
}

export default Overview
