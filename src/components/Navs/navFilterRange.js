// Import React Dependancies
import { useRef, useState, useEffect } from 'react'
// Import Styles
import classes from './navFilterRange.module.scss'

//* Nav Dropdown Filter Component
const NavFilterRange = (props) => {
  // Destructuring Props
  const { heading, min, max, onChange, leftVal, rightVal } = { ...props }
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState({ state: false, side: '', origin: 0 })
  const [dragOffsetLeft, setDragOffsetLeft] = useState(0)
  const [dragOffsetRight, setDragOffsetRight] = useState(0)
  const [leftHandleVal, setLeftHandleVal] = useState(0)
  const [rightHandleVal, setRightHandleVal] = useState(max - min)

  // Destructuring isMouseDown
  const { state, origin, side } = { ...isMouseDown }
  const parentRef = useRef(null)
  const handleLeftRef = useRef(null)
  const handleRightRef = useRef(null)
  const steps = max - min

  useEffect(() => {
    const handleWidth = handleRightRef.current.offsetWidth
    const sliderWidth = parentRef.current.offsetWidth - handleWidth
    const distBtwSteps = sliderWidth / steps
    !isNaN(leftVal) && setIsEnabled(true)
    setLeftHandleVal(leftVal ? leftVal - min : 0)
    setRightHandleVal(rightVal ? rightVal - min : steps)
    setDragOffsetLeft(leftVal ? distBtwSteps * (leftVal - min) : 0)
    setDragOffsetRight(rightVal ? distBtwSteps * (rightVal - min) - sliderWidth : 0)
  }, [steps, min, leftVal, rightVal])

  // Effect that adds Event Listeners for when mouse is lifted and moved while isMouseDown.state is true
  useEffect(() => {
    state && window.addEventListener('mouseup', onMouseUp)
    state && window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
    // eslint-disable-next-line
  }, [state])

  useEffect(() => {
    !state && isEnabled && onChange && onChange(min + leftHandleVal, min + rightHandleVal)
    // eslint-disable-next-line
  }, [state, isEnabled, min, leftHandleVal, rightHandleVal])

  const onMouseUp = () => {
    setIsMouseDown({ state: false, side: '', origin: 0 })
  }

  const onMouseDown = (event, side) => {
    setIsMouseDown({ state: true, side: side, origin: event.clientX })
    setIsEnabled(true)
  }

  const onMouseMove = (event) => {
    const currPos = event.clientX
    const mouseMovementX = currPos - origin
    const handleWidth = handleRightRef.current.offsetWidth
    const sliderWidth = parentRef.current.offsetWidth - handleWidth
    const distBtwSteps = sliderWidth / steps
    const leftHandlePos = Math.round(handleLeftRef.current.offsetLeft / distBtwSteps)
    const rightHandlePos = Math.round(handleRightRef.current.offsetLeft / distBtwSteps)

    if (side === 'left') {
      const newCurrPos = leftHandleVal + Math.round(mouseMovementX / distBtwSteps)
      const stepsToMove = newCurrPos >= rightHandlePos ? rightHandlePos - 1 : newCurrPos < 0 ? 0 : newCurrPos
      setDragOffsetLeft(distBtwSteps * stepsToMove)
      setLeftHandleVal(stepsToMove)
      return
    }

    const newCurrPos = rightHandleVal + Math.round(mouseMovementX / distBtwSteps)
    const stepsToMove = newCurrPos > steps ? steps : newCurrPos <= leftHandlePos ? leftHandlePos + 1 : newCurrPos

    setDragOffsetRight(distBtwSteps * stepsToMove - sliderWidth)
    setRightHandleVal(stepsToMove)
  }

  const isLeftVisbleClass = state && side === 'left' ? classes['vissible'] : ''
  const isRightVisbleClass = state && side === 'right' ? classes['vissible'] : ''
  const isYearRangeVisibleClass = !isNaN(leftVal) ? classes['vissible--years'] : ''
  //* Render Dropdown Filter
  return (
    <div className={classes['container']}>
      <div className={classes['heading']}>
        <div className={classes['title']}>{heading}</div>
        <div
          className={`${classes['years']}  ${isYearRangeVisibleClass}`}
          onClick={() => {
            setIsEnabled(false)
            onChange(undefined, undefined)
          }}
        >
          {leftVal} - {rightVal} &ensp;
          <svg className={classes['svg']} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
          </svg>
        </div>
      </div>
      <div className={classes['range']} ref={parentRef}>
        <div className={classes['range__rail']} />
        <div className={classes['range__track']} style={{ left: dragOffsetLeft, right: Math.abs(dragOffsetRight) }} />
        <div className={`${classes['range__handle']} ${classes['range__handle--left']}`} ref={handleLeftRef} onMouseDown={(e) => onMouseDown(e, 'left')} style={{ left: dragOffsetLeft }}>
          <div className={`${classes['range__handle__tooltip']} ${isLeftVisbleClass}`}>{min + leftHandleVal}</div>
          <div className={classes['range__handle__circle']} />
        </div>
        <div className={`${classes['range__handle']} ${classes['range__handle--right']}`} ref={handleRightRef} onMouseDown={(e) => onMouseDown(e, 'right')} style={{ right: Math.abs(dragOffsetRight) }}>
          <div className={`${classes['range__handle__tooltip']} ${isRightVisbleClass}`}>{min + rightHandleVal}</div>
          <div className={classes['range__handle__circle']} />
        </div>
      </div>
    </div>
  )
}

export default NavFilterRange
