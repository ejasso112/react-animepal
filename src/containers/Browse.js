// Import Custom Components
import NavFilters from '../components/Navs/NavFilters'
import NavTags from '../components/Navs/NavTags'

import classes from './Browse.module.scss'

const Browse = () => {
  return (
    <main className={classes['container']} style={{ paddingTop: '6em', margin: '0 2.5%' }}>
      <NavFilters />
      <NavTags />
    </main>
  )
}

export default Browse
