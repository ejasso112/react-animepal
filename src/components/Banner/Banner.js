// Import React Dependencies
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// Import Helpers
import { getParsedHTML } from '../../services/utilities'
// Import Styles
import componentStyles from './Banner.module.scss'
import sharedStyles from '../SharedStyles.module.scss'

const styles = { ...sharedStyles, ...componentStyles }

//* Banner Component
const Banner = (props) => {
  /* props = {
    type: string - anime/manga
    sort: string - trending_desc/popular_desc/...,
    title: string - Title of Banner,
    year: int - YYYY,
    season: string - spring/summer/fall/winter,
    data: array - Page of Banner Data,
    currPage: int - Active page,
    totalPages: int - Number of pages,
    setCurrPage: function(newCurrPage) - Changes currPage to newCurrPage,
    interval: int - Duration per item in ms,
  } */
  const { type, sort, title, year, season, data, currPage, totalPages, setCurrPage, interval } = props
  const totalPagesArr = [...Array(totalPages).keys()]
  const currItemData = data[currPage - 1]

  // Interval Handler for render time per item in list
  useEffect(() => {
    const intervalHandler = setInterval(() => {
      currPage < totalPages ? setCurrPage(currPage + 1) : setCurrPage(1)
    }, interval)

    return () => clearInterval(intervalHandler)
  }, [interval, currPage, totalPages, setCurrPage])

  // Render: Loading Banner
  if (data.length === 0) {
    return <div>Is Loading</div>
  }

  const buttonsMap = totalPagesArr.map((item, i) => {
    const isActive = i + 1 === currPage ? styles['carousell__button--active'] : ''
    return <div className={`${styles['carousell__button']} ${isActive}`} key={i} onClick={() => setCurrPage(i + 1)}></div>
  })

  const animeTitle = currItemData.title?.english ? currItemData.title?.english : currItemData.title?.romaji ? currItemData.title?.romaji : currItemData.title?.native
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
