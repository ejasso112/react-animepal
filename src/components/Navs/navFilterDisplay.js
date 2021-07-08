// Import Assets
import DisplayCard from '../../assets/DisplayCard'
import DisplayDetailed from '../../assets/DisplayDetailed'
import DisplayGrid from '../../assets/DisplayGrid'
// Import Styles
import classes from './navFilterDisplay.module.scss'

const NavFilterDisplay = () => {
  return (
    <div className={classes['container']}>
      <DisplayCard className={`${classes['svg']}`} />
      <DisplayDetailed className={`${classes['svg']} ${classes['svg--inactive']}`} />
      <DisplayGrid className={`${classes['svg']} ${classes['svg--inactive']}`} />
    </div>
  )
}

export default NavFilterDisplay
