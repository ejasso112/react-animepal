const fetchSearchedPage = async (params) => {
  const query = `
    query ($page: Int, $perPage: Int, $type: MediaType, $search: String, $sort: [MediaSort], $genreIn: [String], $genreNotIn: [String] $seasonYear: Int, $season: MediaSeason, $formatIn: [MediaFormat], $status: MediaStatus, $startDateGreater: FuzzyDateInt, $startDateLesser: FuzzyDateInt, $episodeGreater: Int, $episodeLesser: Int, $durationGreater: Int, $durationLesser: Int, $isAdult: Boolean) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(type: $type, search: $search, sort: $sort, genre_in: $genreIn, genre_not_in: $genreNotIn, seasonYear: $seasonYear, season: $season, format_in: $formatIn, status: $status, startDate_greater: $startDateGreater, startDate_lesser: $startDateLesser, episodes_greater: $episodeGreater, episodes_lesser: $episodeLesser, duration_greater: $durationGreater, duration_lesser: $durationLesser, isAdult: $isAdult) {
          id
          description
          popularity
          coverImage {
            extraLarge
            large
            medium
            color
          }
          title {
            romaji
            english
            native
            userPreferred
          }
          episodes
          startDate {
            year
            month
            day
          }
          averageScore
          format
          genres
          season
          seasonYear
        }
      }
    }`

  const variables = {
    page: params.page,
    perPage: params.perPage,
    type: params.type,
    sort: (params.sort && sort.find((item) => item.option === params.sort).value) || 'POPULARITY_DESC',
    search: params.search,
    genreIn: params.genres,
    seasonYear: params.seasonYear,
    season: params.season && seasons.find((item) => item.option === params.season).value,
    formatIn: params.format && params.format.map((format) => formats.find((item) => item.option === format).value),
    status: params.status && status.find((item) => item.option === params.status).value,
    startDateGreater: params.yearRange && params.yearRange[0] + '0000',
    startDateLesser: params.yearRange && params.yearRange[1] + '0000',
    episodeGreater: params.episodeRange && params.episodeRange[0],
    episodeLesser: params.episodeRange && params.episodeRange[1],
    durationGreater: params.durationRange && params.durationRange[0],
    durationLesser: params.durationRange && params.durationRange[1],
    genreNotIn: !params.hentai && ['Hentai'],
    isAdult: params.hentai,
  }

  console.log(variables)

  const url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  } else {
    const data = await response.json()
    return data.data.Page
  }
}

export default fetchSearchedPage

const sort = [
  { option: 'Title', value: 'TITLE_ENGLISH' },
  { option: 'Popularity', value: 'POPULARITY_DESC' },
  { option: 'Average Score', value: 'SCORE_DESC' },
  { option: 'Trending', value: 'TRENDING_DESC' },
  { option: 'Favorites', value: 'FAVOURITES_DESC' },
  { option: 'Date Added', value: 'ID_DESC' },
  { option: 'Release Date', value: 'START_DATE_DESC' },
]

const seasons = [
  { option: 'Winter', value: 'WINTER' },
  { option: 'Summer', value: 'SUMMER' },
  { option: 'Spring', value: 'SPRING' },
  { option: 'Fall', value: 'FALL' },
]
const formats = [
  { option: 'TV Show', value: 'TV' },
  { option: 'Movie', value: 'MOVIE' },
  { option: 'TV Short', value: 'TV_SHORT' },
  { option: 'Special', value: 'SPECIAL' },
  { option: 'OVA', value: 'OVA' },
  { option: 'ONA', value: 'ONA' },
  { option: 'Music', value: 'MUSIC' },
]
const status = [
  { option: 'Airing', value: 'RELEASING' },
  { option: 'Finished', value: 'FINISHED' },
  { option: 'Not Yet Aired', value: 'NOT_YET_RELEASED' },
  { option: 'Cancelled', value: 'CANCELLED' },
]
