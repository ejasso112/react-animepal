// Import React Dependancies
import { useState, useEffect, useRef } from 'react'
// Import Custom Components
import DropdownArrow from '../../assets/DropdownArrow'
// Import Styles
import classes from './navFilterDropdown.module.scss'

//* Nav Dropdown Filter Component
const NavFilterDropdown = (
  props = {
    heading: '', // ----------- heading of the dropdown group
    content: [], // ----------- array if options to select
    selected: [], // ---------- item that is currently selected
    isMulti: false, // -------- can you select multiple options
    amount: NaN, // ----------- number of selections selected
    onClick: (item) => {}, // - function to perform on option click (add or remove or from context controlled by parent)
  }
) => {
  // Destructuring Props
  const { heading, content, onClick, selected, multi, amount } = { ...props }
  // State to store if the dropdown should be hidden or shown
  const [isHidden, setIsHidden] = useState(true)
  // Ref to keep track of mouse click activity
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
  const contentMap = content.map((item, i) => {
    const itemActiveClass = selected.includes(item) ? classes['dropdown__circle--active'] : ''
    return (
      <div className={classes['dropdown__item']} key={i} onClick={() => onClick(item)}>
        <div>{item}</div>
        <div className={`${classes['dropdown__circle']} ${itemActiveClass}`} />
      </div>
    )
  })

  // Styles class to be applied if dropdown should be hidden
  const hiddenClass = isHidden ? classes['hidden'] : ''
  // Styles class to be applied if the selected value is multi or single
  const textClass = selected[0] ? classes[`selected__text--${multi ? 'multi' : 'single'}`] : ''

  //* Render Dropdown Filter
  return (
    <div className={classes['container']} ref={ref}>
      <div className={classes['title']}>{heading}</div>
      <div className={classes['selected']} onClick={onDropdownClickHandler}>
        <div className={classes['selected__content']}>
          <div className={`${classes['selected__text']} ${textClass}`}>{selected[0] || 'Any'}</div>
          {amount > 0 && <div className={`${classes['selected__text']} ${textClass}`}>+{amount}</div>}
        </div>
        <DropdownArrow className={classes['selected__svg']} />
      </div>
      <div className={`${classes['dropdown']} ${hiddenClass}`}>{contentMap}</div>
    </div>
  )
}

export default NavFilterDropdown
