// Import Custom Components
import SidebarRanking from './sidebarRanking'
import SidebarItem from './sidebarItem'
// Import Helpers
import { getDate, getFullSeason, getStudios, getNextEpAiringTime, getEpDuration } from '../../services/utilities'
// Import Styles
import classes from './SidebarAnime.module.scss'

//* Anime Sidebar Component
const SidebarAnime = (props = {}) => {
  // Destructuring Props Ranks
  const { averageScore, rankings, popularity } = { ...props }
  // Destructuring Props Data
  const { id, type, nextAiringEpisode, format, episodes, duration, status, startDate, endDate, season, seasonYear, studios, source, genres, title, synonyms } = { ...props }

  // TODO Render: Loading Banner
  if (id === undefined) {
    return <div>Loading</div>
  }

  const formattedType = type === 'ANIME' ? 'Anime' : type === 'MANGA' && 'Manga'
  const formattedSeason = season === 'WINTER' ? 'Winter' : season === 'SUMMER' ? 'Summer' : season === 'FALL' ? 'Fall' : season === 'SPRING' && 'spring'

  // Variables to store rankings of All time ranks
  const highestRated = rankings.find((rank) => rank.allTime && rank.type === 'RATED')?.rank
  const mostPopular = rankings.find((rank) => rank.allTime && rank.type === 'POPULAR')?.rank

  // Variable to get Main and Non-main studios
  const [studiosArr, producersArr] = getStudios(studios)

  // Variables to store formatted data that required mapping
  const newStudios = studiosArr.map((studio) => {
    return { content: studio.name, pathname: studio.pathname }
  })
  const newProducers = producersArr.map((studio) => {
    return { content: studio.name, pathname: studio.pathname }
  })

  const newGenres = genres.map((genre) => {
    return { content: genre, pathname: `/Search/${formattedType}`, search: `?genres=${genre}` }
  })
  const newSynonyms = synonyms.map((synonym) => {
    return { content: synonym }
  })

  // Variables to store formatted data
  const newNextAiringEpisode = { content: getNextEpAiringTime(nextAiringEpisode) }
  const newFormat = { content: format }
  const newEpisodes = { content: episodes }
  const newDuration = { content: getEpDuration(duration) }
  const newStatus = { content: status }
  const newStartDate = { content: getDate(startDate) }
  const newEndDate = { content: getDate(endDate) }
  const newSeason = { content: getFullSeason(formattedSeason, seasonYear), pathname: `/Search/${formattedType}`, search: `?year=${seasonYear}&season=${formattedSeason}` }
  const newSource = { content: source }
  const newRomaji = { content: title?.romaji }
  const newEnglish = { content: title?.english }
  const newNative = { content: title?.native }

  //* Render Anime Sidebar
  return (
    <div className={classes['container']}>
      <SidebarRanking rank={averageScore} postContext={`% Average Score`} svg='star' />
      <SidebarRanking rank={highestRated} preContext='#' postContext=' Highest Rated All Time' svg='star' type={formattedType} sort='Average Score' />
      <SidebarRanking rank={mostPopular} preContext='#' postContext=' Most Popular All Time' svg='heart' type={formattedType} sort='Popularity' />
      <SidebarRanking rank={popularity} postContext=' Members' svg='heart' />

      <div className={classes['data']}>
        <SidebarItem heading='Airing' items={[newNextAiringEpisode]} isPrimary />
        <SidebarItem heading='Format' items={[newFormat]} />
        <SidebarItem heading='Episodes' items={[newEpisodes]} />
        <SidebarItem heading='Episode Duration' items={[newDuration]} />
        <SidebarItem heading='Status' items={[newStatus]} />
        <SidebarItem heading='Start Date' items={[newStartDate]} />
        <SidebarItem heading='End Date' items={[newEndDate]} />
        <SidebarItem heading='Season' items={[newSeason]} />
        <SidebarItem heading='Studios' items={newStudios} />
        <SidebarItem heading='Producers' items={newProducers} />
        <SidebarItem heading='Source' items={[newSource]} />
        <SidebarItem heading='Genres' items={newGenres} />
        <SidebarItem heading='Romaji' items={[newRomaji]} />
        <SidebarItem heading='English' items={[newEnglish]} />
        <SidebarItem heading='Native' items={[newNative]} />
        <SidebarItem heading='Synonyms' items={newSynonyms} />
      </div>
    </div>
  )
}

export default SidebarAnime
