// Import React Dependancies
import { Link } from 'react-router-dom'
// Import Styles
import classes from './sidebarItem.module.scss'

//* Sidebar Item Component
const SidebarItem = (
  props = {
    heading: '', // ------ item heading
    items: [], // -------- array of items in ul
    isPrimary: false, // - primary gets different styling
  }
) => {
  // Destructuring Props
  const { heading, items, isPrimary } = { ...props }

  //* Render empty fragment if there is no items
  if (!items[0]?.content) {
    return <></>
  }

  // Variable storing class to apply if Item is primary
  const primaryClass = isPrimary && classes['primary']

  // Map of all items that should be renderd in the unordered list
  const itemsMap = items.map((item, i) => {
    // Destructuring Item
    const { content, pathname, search } = { ...item }
    const toObj = search ? { pathname: pathname, search: search } : { pathname: pathname }

    // Variable to store content
    const formattedContnet = !pathname ? (
      content
    ) : (
      <Link className={classes['link']} to={toObj}>
        {content}
      </Link>
    )

    // return appropriate item fromat
    return (
      <li className={`${classes['items__item']} ${primaryClass || ''}`} key={i}>
        {formattedContnet}
      </li>
    )
  })

  //* Render Sidebar Item
  return (
    <div className={classes['container']}>
      <p className={`${classes['heading']} ${primaryClass || ''}`}>{heading}</p>
      <ul className={classes['items']}>{itemsMap}</ul>
    </div>
  )
}

export default SidebarItem
