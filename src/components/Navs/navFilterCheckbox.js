// Import Styles
import classes from './navFilterCheckbox.module.scss'

const NavFilterCheckbox = (props) => {
  const { heading } = { ...props }
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <div className={classes['content__box']}></div>
        <div className={classes['content__heading']}>{heading}</div>
      </div>
    </div>
  )
}

export default NavFilterCheckbox
