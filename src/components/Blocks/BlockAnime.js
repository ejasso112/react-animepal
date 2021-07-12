// Import Custom Component
import { useEffect, useRef } from 'react'
import { useLazyLoad } from '../../services/customHooks'
import CardAnime from '../Cards/CardAnime'
// Import Styles
import classes from './BlockAnime.module.scss'

//* Anime Block Component
const BlockAnime = (
  props = {
    heading: '', // -------------------------------- title of Carousel
    data: [], // --------------------------------- array of Caorusel data
    currPage: NaN, // ---------------------------- active page
    setCurrPage: (newCurrPage = NaN) => {}, // --- changes currPage to newCurrPage
  }
) => {
  // Destructuring Props
  const { heading, data, currentPage, setCurrPage, hasNextPage } = { ...props }
  const ref = useRef()
  const lazyLoad = useLazyLoad(ref)

  useEffect(() => {
    if (lazyLoad && hasNextPage) setCurrPage(currentPage + 1)
    // eslint-disable-next-line
  }, [lazyLoad, setCurrPage])

  // Map of Prev Page Items
  const dataMap = data.map((item, i) => {
    const itemId = item.id ? item.id : i
    return <CardAnime id={item.id} type={'Anime'} title={item.title} coverImage={item.coverImage} currItemPos={i + 1} totalItems={1} key={itemId} isCurr isAlt />
  })

  // console.log(data)

  return (
    <div className={classes['container']} ref={ref}>
      {dataMap}
    </div>
  )
}

export default BlockAnime
