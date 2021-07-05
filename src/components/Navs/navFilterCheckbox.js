// Import React Dependancies
import { useState, useEffect, memo } from 'react'
// Import Custom Hook
import { useIsMount } from '../../services/customHooks'
// Import Styles
import classes from './navFilterCheckbox.module.scss'

//* Nav Checkbox Filter Component
const NavFilterCheckbox = (
  props = {
    heading: '', // -------------------------------------- heading of the Search Filter
    enabled: false, // ----------------------------------- bool to show if checkbox is enabled or not
    type: '', // ----------------------------------------- query key string
    timeout: NaN, // ------------------------------------- timeout time for less rerenders
    onChange: (isEnabled = [false], type = '') => {}, // - function to perform when enabeld toggles
  }
) => {
  // Destructuring Props
  const { heading, enabled, type, timeout, onChange } = { ...props }
  // State to check if Checkbox is enabled or disabled
  const [isEnabled, setIsEnabled] = useState(enabled || false)
  // Costum Hook to check is isMount or Rerender
  const isMount = useIsMount()

  // Effect to run timeout to only run onChange function every 400ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      !isMount && onChange && onChange(isEnabled ? [isEnabled] : [], type)
    }, timeout || 0)

    return () => {
      clearTimeout(identifier)
    }
    // eslint-disable-next-line
  }, [enabled, timeout, onChange])

  // Handler for when Checkbox onClick to toggle isEnabled
  const onCheckboxClickHandler = () => {
    setIsEnabled((prevState) => !prevState)
  }

  // Styles classes to be applied when checkbox is enabled or desabled
  const isEnabledClass = isEnabled ? classes['content__box__inner--active'] : classes['content__box__inner--hover']

  //* Render Nav Checkbox Filter
  return (
    <div className={classes['container']}>
      <div className={classes['content']}>
        <div className={classes['content__box']} onClick={onCheckboxClickHandler}>
          <div className={`${classes['content__box__inner']} ${isEnabledClass}`} />
        </div>
        <div className={classes['content__heading']}>{heading}</div>
      </div>
    </div>
  )
}

export default memo(NavFilterCheckbox)
