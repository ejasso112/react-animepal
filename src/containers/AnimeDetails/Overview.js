import SectionTrailer from '../../components/Sections/SectionTrailer'

//* Overview Component
const Overview = (props = { trailer: { id: NaN, site: NaN } }) => {
  // Deconstructing Props
  const { trailer } = { ...props }

  //* Render Overview
  return (
    <div>
      <SectionTrailer {...trailer} />
    </div>
  )
}

export default Overview
