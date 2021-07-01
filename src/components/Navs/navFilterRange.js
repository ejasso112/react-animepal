// Import React Dependancies
import { useRef, useState, useEffect } from 'react'
// Import Styles
import classes from './navFilterRange.module.scss'

//* Nav Dropdown Filter Component
const NavFilterRange = (
  props = {
    heading: '', // ----------- heading of the dropdown group
    content: [], // ----------- array if options to select
    selected: [], // ---------- item that is currently selected
    onClick: (item) => {}, // - function to perform on option click (add or remove or from context controlled by parent)
  }
) => {
  // Destructuring Props
  const { heading, min, max } = { ...props }
  const [isMouseDown, setIsMouseDown] = useState({ state: false, side: '', origin: 0 })
  const [dragOffsetLeft, setDragOffsetLeft] = useState()
  const [dragOffsetRight, setDragOffsetRight] = useState()

  const [leftHandleActiveStep, setLeftHandleActiveStep] = useState(0)
  const [rightHandleActiveStep, setRightHandleActiveStep] = useState(max - min)

  const [leftHandleVal, setLeftHandleVal] = useState(0)
  const [rightHandleVal, setRightHandleVal] = useState(max - min)

  // Destructuring isMouseDown
  const { state, origin, side } = { ...isMouseDown }
  const parentRef = useRef(null)
  const handleLeftRef = useRef(null)
  const handleRightRef = useRef(null)
  const steps = max - min

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    state && window.addEventListener('mousemove', onMouseMove)

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [state])

  useEffect(() => {
    if (!state && leftHandleActiveStep !== leftHandleVal) {
      setLeftHandleVal(leftHandleActiveStep)
    }

    if (!state && rightHandleActiveStep !== rightHandleVal) {
      setRightHandleVal(rightHandleActiveStep)
    }
  }, [state, leftHandleActiveStep, leftHandleVal, rightHandleActiveStep, rightHandleVal])

  const onMouseUp = () => {
    setIsMouseDown({ state: false, side: '', origin: 0 })
  }

  const onMouseDown = (event, side) => {
    setIsMouseDown({ state: true, side: side, origin: event.clientX })
  }

  const onMouseMove = (event) => {
    const currPos = event.clientX

    const mouseMovementX = currPos - origin
    const rightHandleLeftOffset = handleRightRef.current.offsetLeft
    const leftHandleLeftOffset = handleLeftRef.current.offsetLeft
    const handleWidth = handleRightRef.current.offsetWidth
    const fullWidth = parentRef.current.offsetWidth - handleWidth

    if (side === 'left') {
      const sliderWidth = rightHandleLeftOffset - handleWidth
      const accessibleSteps = rightHandleVal - 1
      const distBtwSteps = sliderWidth / accessibleSteps
      const accumulatedSteps = leftHandleVal + Math.floor(mouseMovementX / distBtwSteps)
      const stepsToMove = accumulatedSteps > accessibleSteps ? accessibleSteps : accumulatedSteps >= 1 ? accumulatedSteps : 0
      setDragOffsetLeft((sliderWidth / accessibleSteps) * stepsToMove)
      setLeftHandleActiveStep(stepsToMove)

      return
    }

    const sliderWidth = fullWidth - leftHandleLeftOffset - handleWidth
    const firstStep = leftHandleVal + 1
    const accessibleSteps = steps - firstStep
    const distBtwSteps = sliderWidth / accessibleSteps
    const accumulatedSteps = rightHandleVal + Math.floor(mouseMovementX / distBtwSteps)
    const stepsToMove = accumulatedSteps > steps ? steps : accumulatedSteps < firstStep ? firstStep : accumulatedSteps
    setDragOffsetRight((sliderWidth / accessibleSteps) * stepsToMove + handleWidth - distBtwSteps)
    setRightHandleActiveStep(stepsToMove)
  }

  console.log(leftHandleVal, rightHandleVal)
  //* Render Dropdown Filter
  return (
    <div className={classes['container']}>
      <div className={classes['title']}>{heading}</div>
      <div className={classes['range']} ref={parentRef}>
        <div className={classes['range__rail']} />
        <div className={classes['range__track']} />
        <div className={`${classes['range__handle']} ${classes['range__handle--left']}`} ref={handleLeftRef} onMouseDown={(e) => onMouseDown(e, 'left')} style={{ left: dragOffsetLeft }} />
        <div className={`${classes['range__handle']} ${classes['range__handle--right']}`} ref={handleRightRef} onMouseDown={(e) => onMouseDown(e, 'right')} style={{ left: dragOffsetRight }} />
      </div>
    </div>
  )
}

export default NavFilterRange
