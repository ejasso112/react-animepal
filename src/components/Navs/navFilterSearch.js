// Import React Dependancies
import { useState, useEffect } from 'react'
// Import Assets
import MagnifyingGlass from '../../assets/MagnifyingGlass'
// Import Styles
import classes from './navFilterSearch.module.scss'

//* Nav Search Filter Component
const NavFilterSearch = (
  props = {
    heading: '', // ------------------ heading of the Search Filter
    placeholder: '', // -------------- input placeholder text
    defaultValue: '', // ------------- input default text value
    onChange: (value = '') => {}, // - function to perform when input value changes
  }
) => {
  // Destructuring Props
  const { heading, placeholder, defaultValue, onChange } = { ...props }
  // State to store the currnet value
  const [searchQuery, setSearchQuery] = useState(defaultValue || '')

  // Effect to run timeout to only run onChange function every 400ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      onChange && onChange(searchQuery)
    }, 400)

    return () => {
      clearTimeout(identifier)
    }
  })

  // Handler that updates State when input onChange Event is triggered
  const onChangeHandler = (e) => {
    setSearchQuery(e.target.value)
  }

  //* Render Nav Search Filter
  return (
    <div className={classes['container']}>
      <div className={classes['heading']}>{heading}</div>
      <div className={classes['content']}>
        <MagnifyingGlass className={classes['content__svg']} />
        <input className={classes['content__text']} placeholder={placeholder || 'Search'} onChange={onChangeHandler} value={searchQuery} />
      </div>
    </div>
  )
}

export default NavFilterSearch
