// Import Styles
import classes from './navFilterSearch.module.scss'
import MagnifyingGlass from '../../assets/MagnifyingGlass'
const NavFilterSearch = (props) => {
  // Destructuring Props
  const { heading } = { ...props }

  return (
    <div className={classes['container']}>
      <div className={classes['heading']}>{heading}</div>
      <div className={classes['content']}>
        <MagnifyingGlass className={classes['content__svg']} />
        <input className={classes['content__text']} placeholder='Search' />
      </div>
    </div>
  )
}

export default NavFilterSearch
