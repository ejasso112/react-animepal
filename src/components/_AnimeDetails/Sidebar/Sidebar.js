// Import Custom Components
import Ranking from './Ranking'
import Item from './Item'
// Import Helpers
import { getDate, getFullSeason, getStudios, getNextEpAiringTime } from '../../../services/utilities'
// Import Styles
import styles from './Sidebar.module.scss'

const Sidebar = (props = {}) => {
  // Deconstructing Props Ranks
  const { averageScore, rankings, popularity } = props
  // Deconstructing Props Data
  const { id, nextAiringEpisode, format, episodes, duration, status, startDate, endDate, season, seasonYear, studios, source, genres, title, synonyms } = props

  // TODO Render: Loading Banner
  if (id === undefined) {
    return <div>Loading</div>
  }

  // Varibles to store rankings of All time ranks
  const highestRated = rankings.find((rank) => rank.allTime && rank.type === 'RATED')?.rank
  const mostPopular = rankings.find((rank) => rank.allTime && rank.type === 'POPULAR')?.rank

  // Variables to hold fromated data
  const newNextAiringEpisode = getNextEpAiringTime(nextAiringEpisode)
  const newStartDate = getDate(startDate)
  const newEndDate = getDate(endDate)
  const newSeason = getFullSeason(season, seasonYear)
  const [newStudios, newProducers] = getStudios(studios)

  return (
    <div className={styles['sidebar']}>
      <div>
        <Ranking rank={averageScore} postContext={`% Average Score`} svg='star' />
        <Ranking rank={highestRated} preContext='#' postContext=' Highest Rated All Time' svg='star' type='ANIME' sort='SCORE_DESC' />
        <Ranking rank={mostPopular} preContext='#' postContext=' Most Popular All Time' svg='heart' type='ANIME' sort='POPULARITY_DESC' />
        <Ranking rank={popularity} postContext=' Members' svg='heart' />
      </div>

      <div className={styles['data']}>
        <Item heading='Airing' items={[newNextAiringEpisode]} />
        <Item heading='Format' items={[format]} />
        <Item heading='Episodes' items={[episodes]} />
        <Item heading='Episode Duration' items={[`${duration} mins`]} />
        <Item heading='Status' items={[status]} />
        <Item heading='Start Date' items={[newStartDate]} />
        <Item heading='End Date' items={[newEndDate]} />
        <Item heading='Season' items={[newSeason]} />
        <Item heading='Studios' items={[...newStudios]} />
        <Item heading='Producers' items={[...newProducers]} />
        <Item heading='Source' items={[source]} />
        <Item heading='Genres' items={[...genres]} />
        <Item heading='Romaji' items={[title?.romaji]} />
        <Item heading='English' items={[title?.english]} />
        <Item heading='Native' items={[title?.native]} />
        <Item heading='Synonyms' items={[...synonyms]} />
      </div>
    </div>
  )
}

export default Sidebar
