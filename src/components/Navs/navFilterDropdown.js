// Import React Dependancies
import { useState, useEffect, useRef } from 'react'
// Import Styles
import classes from './navFilter.module.scss'
import DropdownArrow from '../../assets/DropdownArrow'

//* Nav Dropdown Filter Component
const NavFilterDropdown = (props) => {
  // Deconstructing Props
  const { title, content, onClick, value, multi, amount } = { ...props }
  const [isHidden, setIsHidden] = useState(true)
  const ref = useRef()

  // Event Listener for when you click ouside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target) && !isHidden) {
        setIsHidden(true)
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, isHidden])

  // Dropdown menu visability handler
  const onDropdownClickHandler = () => {
    setIsHidden((prevState) => !prevState)
  }

  // Variable to store map of dropdown items
  const contentMap = content.map((item, i) => (
    <div className={classes['item']} key={i} onClick={() => onClick(item)}>
      {item}
    </div>
  ))

  const hiddenClass = isHidden ? classes['hidden'] : ''

  const textClass = value ? classes[`text--${multi ? 'multi' : 'single'}`] : ''
  //* Render Dropdown Filter
  return (
    <div className={classes['container']} ref={ref}>
      <div className={classes['title']}>{title}</div>
      <div className={classes['content']} onClick={onDropdownClickHandler}>
        <div className={classes['text__wrapper']}>
          <div className={`${classes['text']} ${textClass}`}>{value || 'Any'}</div>
          {amount > 0 && <div className={`${classes['text']} ${textClass}`}>+{amount}</div>}
        </div>
        <DropdownArrow className={classes['svg']} />
        <div className={`${classes['menu']} ${hiddenClass}`}>{contentMap}</div>
      </div>
    </div>
  )
}

export default NavFilterDropdown
