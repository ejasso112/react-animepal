// Import React Dependancies
import { useState, useEffect, useRef, memo } from 'react'
// Import Custom Hook
import { useIsMount } from '../../services/customHooks'
// Import Custom Components
import DropdownArrow from '../../assets/DropdownArrow'
import DoubleArrow from '../../assets/DoubleArrow'
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
  const { heading, options, defaultValues, type, timeout, multiSelect, altSelect, onChange } = { ...props }
  // State to store the current value
  const [values, setValues] = useState(defaultValues || [])
  // State to store the bool if dropdown is hidden or not
  const [isHidden, setIsHidden] = useState(true)
  // Costum Hook to check is isMount or Rerender
  const isMount = useIsMount()
  // ref to track mose click position
  const ref = useRef()

  // Effect to update values state when defaultValues Changes
  useEffect(() => {
    Array.isArray(defaultValues) && JSON.stringify(defaultValues) !== JSON.stringify(values) && setValues(defaultValues)
    !Array.isArray(defaultValues) && setValues([])
    // eslint-disable-next-line
  }, [defaultValues])

  // Effect to run timeout to only run onChange function every 400ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (defaultValues || values.length > 0 ? true : false) {
        !isMount && onChange && onChange(values, type)
      }
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
  const contentMap = options.map((item, i) => {
    const isActiveClass = values.length === 0 && item === 'Popularity' ? classes['dropdown__circle--active'] : values.includes(item) ? classes['dropdown__circle--active'] : ''

    return (
      <div className={`${classes['dropdown__item']} ${altSelect ? classes['dropdown__item--alt'] : ''}`} key={i} onClick={onDropdownOptionClickHandler}>
        <div className={classes['dropdown__text']}>{item}</div>
        <div className={`${classes['dropdown__circle']} ${isActiveClass}`} />
      </div>
    )
  })

  // Styles class to be applied if dropdown should be hidden
  const hiddenClass = isHidden ? classes['hidden'] : ''
  // Styles class to be applied if the selected value is multi or single
  const textClass = values[0] ? classes[`content__text--${multiSelect ? 'multi' : altSelect ? 'alt' : 'single'}`] : ''

  if (altSelect) {
    return (
      <div className={`${classes['container']} ${classes['container--alt']}`} ref={ref}>
        <div className={`${classes['content']} ${classes['content--alt']}`} onClick={onDropdownClickHandler}>
          <DoubleArrow className={`${classes['content__svg']} ${classes['content__svg--alt']}`} />
          <div className={classes['content__container']}>
            <div className={`${classes['content__text']} ${classes['content__text--alt']}`}>{values[0] || 'Popularity'}</div>
            {values.length > 1 && <div className={`${classes['content__text']} ${textClass}`}>+{values.length - 1}</div>}
          </div>
        </div>
        <div className={`${classes['dropdown']} ${classes['dropdown--alt']} ${hiddenClass}`}>{contentMap}</div>
      </div>
    )
  }

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

export default memo(NavFilterDropdown)
