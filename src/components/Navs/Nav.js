import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo.js'
import MagnifyingGlass from '../../assets/MagnifyingGlass.js'
import classes from './Nav.module.scss'

const Nav = () => {
  const location = useLocation().pathname
  const links = [
    { to: '/Home', title: 'HOME' },
    { to: '/Anime', title: 'ANIME' },
    { to: '/Manga', title: 'MANGA' },
    { to: '/Browse', title: 'BROWSE' },
  ]

  const linksMap = links.map((link, i) => {
    const isLinkActive = link.to === location ? classes['nav__tag--active'] : ''

    return (
      <li className={`${classes['nav__tag']} ${isLinkActive}`} key={i}>
        <Link to={link.to}>{link.title}</Link>
      </li>
    )
  })

  return (
    <nav className={classes['nav__container']}>
      <div className={classes['nav']}>
        <Link className={classes['nav__logo']} to='/'>
          <Logo />
        </Link>

        <ul className={classes['nav__primary']}>{linksMap}</ul>

        <div className={classes['nav__secondary']}>
          <div className={classes['nav__searchBox']}>
            <MagnifyingGlass />
            <input type='text' aria-label='Search' placeholder='Search' />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
