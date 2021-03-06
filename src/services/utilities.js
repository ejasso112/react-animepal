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
  if (month === 12 || month === 1 || month === 2) return 'Winter'
  if (month === 3 || month === 4 || month === 5) return 'Spring'
  if (month === 6 || month === 7 || month === 8) return 'Summer'
  return 'Fall'
}

// Return Next Season String
const getNextSeason = () => {
  const currentDate = new Date()
  const month = currentDate.getMonth() + 1

  if (month === 12 || month === 1 || month === 2) return 'Spring'
  if (month === 3 || month === 4 || month === 5) return 'Summer'
  if (month === 6 || month === 7 || month === 8) return 'Fall'
  return 'Winter'
}

// Return Parsed String with Season and Year
const getFullSeason = (season, seasonYear) => {
  const parsedSeason = season && seasonYear && `${season} ${seasonYear}`
  return parsedSeason
}

const getStudios = (studios) => {
  const { edges, nodes } = studios

  const formattedStudios = nodes.map((studio, i) => {
    return { ...studio, ...edges[i] }
  })

  const newStudios = formattedStudios
    .filter((studio) => studio.isMain)
    .map((studio) => {
      return { pathname: `/Studio/${studio.id}/${studio.name.replaceAll(' ', '_')}`, name: studio.name }
    })
  const newProducers = formattedStudios
    .filter((studio) => !studio.isMain)
    .map((studio) => {
      return { pathname: `/Studio/${studio.id}`, name: studio.name }
    })

  return [newStudios, newProducers]
}

const getEpDuration = (duration) => {
  if (!duration) {
    return undefined
  }

  return `${duration} mins`
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

const getQueryObject = (queryString = '') => {
  let queryObj = {}
  const parsedQuery = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (const query of parsedQuery) {
    const [key, value] = query.split('=')
    queryObj.hasOwnProperty(key)
    queryObj = queryObj.hasOwnProperty(key) ? { ...queryObj, [key]: [...queryObj[key], decodeURIComponent(value)] } : { ...queryObj, [key]: [decodeURIComponent(value)] }
  }
  return queryString ? queryObj : {}
}

const getQueryArray = (queryString) => {
  const parsedQuery = getQueryObject(queryString)

  const query = []
  for (const [key, values] of Object.entries(parsedQuery)) {
    if (key === 'yearRange') query.push([key, `Year Range: ${values[0]} - ${values[1]}`])
    else if (key === 'episodeRange') query.push([key, `Episodes: ${values[0]} - ${values[1]}`])
    else if (key === 'durationRange') query.push([key, `Duration: ${values[0]} - ${values[1]}`])
    else if (key === 'hentai') query.push([key, 'Hentai'])
    else if (key !== 'sort') values.map((value) => query.push([key, value]))
  }

  return query
}

const getQueryString = (values) => {
  let queryObj = {}
  for (const [key, value] of Object.entries(values)) {
    queryObj = { ...queryObj, [key]: value.map((value) => `${key}=${value}`).join('&') }
  }

  const { search, type, sort, genres, year, season, format, status, yearRange, episodeRange, durationRange, hentai } = { ...queryObj }
  const queryString = [search, type, sort, genres, year, season, format, status, yearRange, episodeRange, durationRange, hentai].filter((value) => value).join('&')

  return queryString ? `?${queryString}` : queryString
}

const mergeClasses = (componentClass = {}, SharedClass = {}) => {
  const classObj = { ...componentClass }
  for (const [key, value] of Object.entries(classObj)) {
    classObj[key] = SharedClass.hasOwnProperty(key) ? `${value} ${SharedClass[key]}` : value
  }

  return { ...SharedClass, ...classObj }
}

const parseAnimeLink = (path) => {
  const pathArr = path.split('/')
  if (!isNaN(path[path.length - 1])) return path

  pathArr.pop()
  return pathArr.join('/')
}
export { getParsedHTML, getCurrYear, getDate, getCurrSeason, getNextSeason, getFullSeason, getStudios, getEpDuration, getNextEpAiringTime, getQueryObject, mergeClasses, getQueryArray, getQueryString, parseAnimeLink }
