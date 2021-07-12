import { useRef, useEffect, useState } from 'react'

export const useIsMount = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

export const useLazyLoad = (forwardRef) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (forwardRef) {
      const handleScroll = () => {
        let containerHightOffset = forwardRef.current.offsetTop + forwardRef.current.clientHeight
        let pageOffset = window.pageYOffset + window.innerHeight

        if (pageOffset + 1024 >= containerHightOffset) return setIsActive(true)
        return setIsActive(false)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [forwardRef])

  return isActive
}
