// Import Styles
import styles from './Item.module.scss'

const Item = (props = { heading: '', items: [] }) => {
  // Deconstructing Props
  const { heading, items } = props

  // If the there is no item to render then return empty fragment
  if (!items[0]) {
    return <></>
  }

  // Map of all items that should be renderd in the unordered list
  const itemsMap = items.map((item, i) => (
    <li className={styles['item__context']} key={i}>
      {item}
    </li>
  ))

  return (
    <div className={styles['item']}>
      <p className={styles['item__heading']}>{heading}</p>
      <ul className={styles['item__list']}>{itemsMap}</ul>
    </div>
  )
}

export default Item
