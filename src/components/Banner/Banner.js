// Import React Dependencies
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// Import Helpers
import { getParsedHTML } from '../../services/utilities'
// Import Styles
import componentStyles from './Banner.module.scss'
import sharedStyles from '../SharedStyles.module.scss'
// Combined Styles
const styles = { ...sharedStyles, ...componentStyles }

//* Banner Component
const Banner = (
  props = {
    type: '', // --------------- anime/manga
    sort: '', // --------------- trending_desc/popular_desc/...
    title: '', // -------------- title of Banner
    year: NaN, // -------------- yyyy
    season: '', // ------------- spring/summer/fall/winter
    data: [], // --------------- page of Banner Data
    currPage: NaN, // ---------- active page
    totalPages: NaN, // -------- number of pages
    setCurrPage: () => {}, //--- changes currPage to newCurrPage
    interval: NaN, // ---------- duration per item in ms
  }
) => {
  // Destructuring Props
  const { type, sort, title, year, season, data, currPage, totalPages, setCurrPage, interval } = props

  // Interval Handler for render time per item in list
  useEffect(() => {
    const intervalHandler = setInterval(() => {
      currPage < totalPages ? setCurrPage(currPage + 1) : setCurrPage(1)
    }, interval)

    return () => clearInterval(intervalHandler)
  }, [interval, currPage, totalPages, setCurrPage])

  // TODO Render: Loading Banner
  if (data.length === 0) {
    return <div>Is Loading</div>
  }

  // Creating Button Map for Banner Buttons
  const totalPagesArr = [...Array(totalPages).keys()]
  const buttonsMap = totalPagesArr.map((item, i) => {
    const isActive = i + 1 === currPage ? styles['carousell__button--active'] : ''
    return <div className={`${styles['carousell__button']} ${isActive}`} key={i} onClick={() => setCurrPage(i + 1)}></div>
  })

  // Creating varible with current page data from the data array
  const currItemData = data[currPage - 1]

  // Getting Anime title that is not undefined
  const animeTitle = currItemData.title?.english ? currItemData.title?.english : currItemData.title?.romaji ? currItemData.title?.romaji : currItemData.title?.native
  // Getting Banner img that is not undefined
  const bannerImg = currItemData?.bannerImage ? currItemData?.bannerImage : currItemData?.coverImage.extraLarge

  // Render: Loaded Banner
  return (
    <div className={styles['banner__container']}>
      <div className={styles['banner']}>
        <div className={styles['banner__bg']}>
          <img className={styles['banner__bg__img']} src={bannerImg} alt={animeTitle} />
          <div className={styles['banner__bg__overlay']} />
        </div>

        <div className={styles['banner__content']}>
          <h2 className={`${styles['banner__content__heading']} ${styles['carousell__viewMore']}`}>
            <Link to={{ pathname: '/search', search: `?type=${type}&year=${year}&season=${season}&sort=${sort}` }}>
              {title}
              <span>View More</span>
            </Link>
          </h2>
          <h3 className={styles['banner__content__title']}>{animeTitle}</h3>
          <p className={styles['banner__content__description']}>{getParsedHTML(currItemData.description)}</p>
          <Link className={styles['banner__content__view']} to={{ pathname: `/${type}/${currItemData.id}/${currItemData.title.romaji}`.replaceAll(' ', '-') }}>
            View&ensp;▶
          </Link>
        </div>
      </div>

      <div className={styles['carousell__buttons']}>{buttonsMap}</div>
    </div>
  )
}

export default Banner
