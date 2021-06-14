import parse from 'html-react-parser'

// Parses a string into HTML
const getParsedHTML = (string) => {
  if (string) {
    return parse(string)
  }
  return false
}

// Returns Current Year Int
const getYear = () => {
  const currentDate = new Date()

  return currentDate.getFullYear()
}

// Returns Current Season String
const getSeason = () => {
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

export { getParsedHTML, getYear, getSeason, getNextSeason }
