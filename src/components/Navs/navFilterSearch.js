// Import React Dependancies
import { useState, useEffect, memo } from 'react'
// Import Custom Hook
import { useIsMount } from '../../services/customHooks'
// Import Assets
import MagnifyingGlass from '../../assets/MagnifyingGlass'
// Import Styles
import classes from './navFilterSearch.module.scss'

//* Nav Search Filter Component
const NavFilterSearch = (
  props = {
    heading: '', // ------------------------------- heading of the Search Filter
    placeholder: '', // --------------------------- input placeholder text
    defaultValue: '', // -------------------------- input default text value
    type: '', // ---------------------------------- query key string
    timeout: NaN, // ------------------------------ timeout time for less rerenders
    onChange: (value = [''], type = '') => {}, // - function to perform when input value changes
  }
) => {
  // Destructuring Props
  const { heading, placeholder, defaultValue, type, timeout, onChange } = { ...props }
  // State to store the current value
  const [value, setValue] = useState(defaultValue || '')
  // Costum Hook to check is isMount or Rerender
  const isMount = useIsMount()

  // Effect to run timeout to only run onChange function every 400ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      !isMount && onChange && onChange(value ? [value] : [], type)
    }, timeout || 0)

    return () => {
      clearTimeout(identifier)
    }

    // eslint-disable-next-line
  }, [value, timeout, onChange])

  // Handler that updates State when input onChange event is triggered
  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }

  //* Render Nav Search Filter
  return (
    <div className={classes['container']}>
      <div className={classes['heading']}>{heading}</div>
      <div className={classes['content']}>
        <MagnifyingGlass className={classes['content__svg']} />
        <input className={classes['content__text']} placeholder={placeholder || 'Search'} onChange={onChangeHandler} value={value} />
      </div>
    </div>
  )
}

export default memo(NavFilterSearch)
