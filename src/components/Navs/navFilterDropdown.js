// Import React Dependancies
import { useState, useEffect, useRef } from 'react'
// Import Custom Hook
import { useIsMount } from '../../services/customHooks'
// Import Custom Components
import DropdownArrow from '../../assets/DropdownArrow'
// Import Styles
import classes from './navFilterDropdown.module.scss'

//* Nav Dropdown Filter Component
const NavFilterDropdown = (
  props = {
    heading: '', // -------------------------------- heading of the Dropdown Filter
    options: [''], // ------------------------------ array of options to select
    defaultValues: [''], // ------------------------ array of options selected by default
    type: '', // ----------------------------------- query key string
    timeout: NaN, // ------------------------------- timeout time for less rerenders
    multiSelect: false, // ------------------------- can you select multiple options
    onChange: (values = [''], type = '') => {}, // - function to perform when input values change
  }
) => {
  // Destructuring Props
  const { heading, options, defaultValues, type, timeout, multiSelect, onChange } = { ...props }
  // State to store the current value
  const [values, setValues] = useState(defaultValues || [])
  // State to store the bool if dropdown is hidden or not
  const [isHidden, setIsHidden] = useState(true)
  // Costum Hook to check is isMount or Rerender
  const isMount = useIsMount()
  // ref to track mose click position
  const ref = useRef()

  // Effect to run timeout to only run onChange function every 400ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      !isMount && onChange && onChange(values, type)
    }, timeout || 0)

    return () => {
      clearTimeout(identifier)
    }

    // eslint-disable-next-line
  }, [values, timeout, onChange])

  // Event Listener for when you click outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target) && !isHidden) {
        setIsHidden(true)
      }
    }

    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, isHidden])

  // Dropdown menu visability handler
  const onDropdownClickHandler = () => {
    setIsHidden((prevState) => !prevState)
  }

  // Handler that updates State when option onClick event is triggered
  const onDropdownOptionClickHandler = (e) => {
    const option = e.target.innerText
    const isOptionUnique = !values.includes(option)

    if (!isOptionUnique) {
      return setValues((prevState) => prevState.filter((value) => value !== option))
    }

    return multiSelect ? setValues((prevState) => [...prevState, option]) : setValues([option])
  }

  // Variable to store map of dropdown items
  const contentMap = options.map((item, i) => (
    <div className={classes['dropdown__item']} key={i} onClick={onDropdownOptionClickHandler}>
      <div>{item}</div>
      {values.includes(item) && <div className={`${classes['dropdown__circle']} `} />}
    </div>
  ))

  // Styles class to be applied if dropdown should be hidden
  const hiddenClass = isHidden ? classes['hidden'] : ''
  // Styles class to be applied if the selected value is multi or single
  const textClass = values[0] ? classes[`content__text--${multiSelect ? 'multi' : 'single'}`] : ''

  //* Render Nav Dropdown Filter
  return (
    <div className={classes['container']} ref={ref}>
      <div className={classes['heading']}>{heading}</div>
      <div className={classes['content']} onClick={onDropdownClickHandler}>
        <div className={classes['content__container']}>
          <div className={`${classes['content__text']} ${textClass}`}>{values[0] || 'Any'}</div>
          {values.length > 1 && <div className={`${classes['content__text']} ${textClass}`}>+{values.length - 1}</div>}
        </div>
        <DropdownArrow className={classes['content__svg']} />
      </div>
      <div className={`${classes['dropdown']} ${hiddenClass}`}>{contentMap}</div>
    </div>
  )
}

export default NavFilterDropdown
