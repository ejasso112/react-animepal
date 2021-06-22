import parse from 'html-react-parser'

// Parses a string into HTML
const getParsedHTML = (string) => {
  if (string) {
    return parse(string)
  }
  return false
}

// Returns Current Year Int
const getCurrYear = () => {
  const currentDate = new Date()

  return currentDate.getFullYear()
}

// Return Parsed Date based on argument
const getDate = (date = { year: NaN, month: NaN, day: NaN }) => {
  // Deconstructing date
  const { year, month, day } = date
  // Create a new Date Object
  const newDate = new Date(year, month - 1, day ? day : 1)

  // Parse the date into seperate parts
  const newYear = newDate.toLocaleString('default', { year: 'numeric' })
  const newMonth = newDate.toLocaleString('default', { month: 'long' })
  const newDay = newDate.toLocaleString('default', { day: 'numeric' })

  const parsedDate = year === null ? undefined : month === null ? `${newYear}` : day === null ? `${newMonth} ${newYear}` : `${newMonth} ${newDay}, ${newYear}`
  return parsedDate
}

// Returns Current Season String
const getCurrSeason = () => {
  const currentDate = new Date()
  const month = currentDate.getMonth() + 1

  let season = ''
  switch (month) {
    case 12:
    case 1:
    case 2:
      season = 'WINTER'
      break
    case 3:
    case 4:
    case 5:
      season = 'SPRING'
      break
    case 6:
    case 7:
    case 8:
      season = 'SUMMER'
      break
    default:
      season = 'FALL'
      break
  }
  return season
}

// Return Next Season String
const getNextSeason = () => {
  const currentDate = new Date()
  const month = currentDate.getMonth() + 1

  let season = ''
  switch (month) {
    case 12:
    case 1:
    case 2:
      season = 'SPRING'
      break
    case 3:
    case 4:
    case 5:
      season = 'SUMMER'
      break
    case 6:
    case 7:
    case 8:
      season = 'FALL'
      break
    default:
      season = 'WINTER'
      break
  }
  return season
}

// Return Parsed String with Season and Year
const getFullSeason = (season, seasonYear) => {
  const parsedSeason = season === null ? undefined : seasonYear === null ? undefined : `${season} ${seasonYear}`
  return parsedSeason
}

const getStudios = (studios) => {
  const { edges, nodes } = studios

  const formattedStudios = nodes.map((studio, i) => {
    return { ...studio, ...edges[i] }
  })

  const newStudios = formattedStudios.filter((studio) => studio.isMain).map((studio) => studio.name)
  const newProducers = formattedStudios.filter((studio) => !studio.isMain).map((studio) => studio.name)
  return [newStudios, newProducers]
}

const getNextEpAiringTime = (airingTime = { episode: NaN, timeUntilAiring: NaN }) => {
  // Deconstructing Arguements
  const { episode, timeUntilAiring } = { ...airingTime }

  if (!timeUntilAiring || !episode) {
    return undefined
  }

  const mins = timeUntilAiring / 60
  const hours = mins / 60
  const days = hours / 24

  const daysLeft = Math.floor(days)
  const hoursLeft = Math.floor(hours - daysLeft * 24)
  const minsLeft = Math.floor(mins - daysLeft * 1440 - hoursLeft * 60)

  return `Ep ${episode}: ${daysLeft}d ${hoursLeft}h ${minsLeft}m`
}

export { getParsedHTML, getCurrYear, getDate, getCurrSeason, getNextSeason, getFullSeason, getStudios, getNextEpAiringTime }
