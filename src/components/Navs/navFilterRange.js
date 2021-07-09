// Import React Dependancies
import { useRef, useState, useEffect, memo } from 'react'
// Import Custom Hook
import { useIsMount } from '../../services/customHooks'
// Import Styles
import classes from './navFilterRange.module.scss'

//* Nav Range Filter Component
const NavFilterRange = (
  props = {
    heading: '', // --------------------------------- heading of the Range Filter
    min: NaN, // ------------------------------------ min Range value
    max: NaN, // ------------------------------------ max Range value
    defaultValues: [NaN], // ------------------------ array of values selected by default
    type: '', // ------------------------------------ query key string
    timeout: NaN, // -------------------------------- timeout time for less rerenders
    onChange: (values = [NaN], type = '') => {}, // - function to perform when input values change
  }
) => {
  // Destructuring Props
  const { heading, min, max, defaultValues, type, timeout, onChange } = { ...props }
  // State to check if Range is Enabled or Disabled
  const [isEnabled, setIsEnabled] = useState(defaultValues ? true : false)
  // State to store data when mouseDown on a handle
  const [isListening, setIsListening] = useState({ state: false, side: '', origin: 0 })
  // State to store the current range values
  const [values, setValues] = useState([defaultValues ? Number(defaultValues[0]) : min, defaultValues ? Number(defaultValues[1]) : max])
  // State to store the current range offsets
  const [offsets, setOffsets] = useState([defaultValues ? (100 / (max - min)) * (defaultValues[0] - min) : 0, defaultValues ? (100 / (max - min)) * (defaultValues[1] - min) : 100])
  // Destructuring isListening
  const { state, origin, side } = { ...isListening }
  // Costum Hook to check is isMount or Rerender
  const isMount = useIsMount()
  // Refs to get element widths
  const sliderRef = useRef(null)
  const handleRef = useRef(null)

  // Effect to update values, isenabled, offsets state when defaultValues Changes
  useEffect(() => {
    if (Array.isArray(defaultValues) && JSON.stringify(defaultValues) !== JSON.stringify(values)) {
      setIsEnabled(true)
      setValues([Number(defaultValues[0]), Number(defaultValues[1])])
      setOffsets([(100 / (max - min)) * (defaultValues[0] - min), 100], (100 / (max - min)) * (defaultValues[1] - min))
    } else if (!Array.isArray(defaultValues)) {
      setIsEnabled(false)
      setValues([min, max])
      setOffsets([0, 100])
    }

    // eslint-disable-next-line
  }, [defaultValues])

  // Effect to run timeout to only run onChange function every 400ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (defaultValues || JSON.stringify(values) !== JSON.stringify([min, max])) {
        !isMount && onChange && onChange(isEnabled ? values : [], type)
      }
    }, timeout || 0)

    return () => {
      clearTimeout(identifier)
    }
    // eslint-disable-next-line
  }, [values, isEnabled, timeout, onChange])

  // Effect that adds Event Listeners for when mouse is lifted and moved while isMouseDown.state is true
  useEffect(() => {
    state && window.addEventListener('mouseup', onMouseUpHandler)
    state && window.addEventListener('mousemove', onMouseMoveHandler)

    return () => {
      window.removeEventListener('mouseup', onMouseUpHandler)
      window.removeEventListener('mousemove', onMouseMoveHandler)
    }
    // eslint-disable-next-line
  }, [state])

  // Handler for when mouse is up
  const onMouseUpHandler = () => {
    setIsListening({ state: false, side: '', origin: 0 })
  }

  // Handler for when mouse is down
  const onMouseDownHandler = (event, side) => {
    setIsListening({ state: true, side: side, origin: event.clientX })
    setIsEnabled(true)
  }

  // Handler for when mouse is moving
  const onMouseMoveHandler = (event) => {
    const mouseMovementX = event.clientX - origin
    const handleWidth = handleRef.current.offsetWidth
    const sliderWidth = sliderRef.current.offsetWidth - handleWidth
    const distBtwSteps = 100 / (max - min)
    const offset = side === 'left' ? (mouseMovementX / sliderWidth) * 100 + offsets[0] : (mouseMovementX / sliderWidth) * 100 + offsets[1]
    const value = Math.floor(offset / distBtwSteps)

    if (side === 'left') {
      const finalValue = value + min >= values[1] ? values[1] - 1 : value + min < min ? min : value + min
      const finalOffset = (100 / (max - min)) * (finalValue - min)
      setOffsets((prevOffsets) => [finalOffset, prevOffsets[1]])
      setValues((prevValues) => [finalValue, prevValues[1]])
      return
    }

    const finalValue = value + min > max ? max : value + min <= values[0] ? values[0] + 1 : value + min
    const finalOffset = (100 / (max - min)) * (finalValue - min)
    setOffsets((prevOffsets) => [prevOffsets[0], finalOffset])
    setValues((prevValues) => [prevValues[0], finalValue])
  }

  // Handler for when mouse range tag is clicked
  const onRangeTagClickHandler = () => {
    setIsEnabled(false)
    setValues([min, max])
    setOffsets([0, 100])
  }

  // Styles class to be applied if left handle is being held
  const isLeftVisbleClass = state && side === 'left' ? classes['vissible'] : ''
  // Styles class to be applied if right handle is being held
  const isRightVisbleClass = state && side === 'right' ? classes['vissible'] : ''
  // Styles class to be applied if range is enabled
  const isYearRangeVisibleClass = isEnabled ? classes['vissible--years'] : ''

  //* Render Nav Range Filter
  return (
    <div className={classes['container']} ref={sliderRef}>
      <div className={classes['heading']}>
        <div className={classes['title']}>{heading}</div>
        <div className={`${classes['years']}  ${isYearRangeVisibleClass}`} onClick={onRangeTagClickHandler}>
          {values[0]} - {values[1]} &ensp;
          <svg className={classes['svg']} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
          </svg>
        </div>
      </div>
      <div className={classes['range']}>
        <div className={classes['range__rail']} />
        <div className={classes['range__track']} style={{ left: `${offsets[0]}%`, right: `${100 - offsets[1]}%` }} />
        <div className={`${classes['range__handle']} ${classes['range__handle--left']}`} onMouseDown={(e) => onMouseDownHandler(e, 'left')} style={{ left: `${offsets[0]}%`, transform: `translateX(-${offsets[0]}%)` }}>
          <div className={`${classes['range__handle__tooltip']} ${isLeftVisbleClass}`}>{values[0]}</div>
          <div className={classes['range__handle__circle']} ref={handleRef} />
        </div>
        <div className={`${classes['range__handle']} ${classes['range__handle--right']}`} onMouseDown={(e) => onMouseDownHandler(e, 'right')} style={{ right: `${100 - offsets[1]}%`, transform: `translateX(${100 - offsets[1]}%)` }}>
          <div className={`${classes['range__handle__tooltip']} ${isRightVisbleClass}`}>{values[1]}</div>
          <div className={classes['range__handle__circle']} />
        </div>
      </div>
    </div>
  )
}

export default memo(NavFilterRange)
