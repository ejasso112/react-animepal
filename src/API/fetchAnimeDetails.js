const fetchAnimeDetails = async (params) => {
  const query = `
    query ($id: Int) {
      Media(id: $id) {
        # ----------------------
        # Basic Data
        # ----------------------
        id
        idMal
        type
        bannerImage
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
        description

        # ----------------------
        # Rankings Data
        # ----------------------
        averageScore
        rankings {
          id
          rank
          type
          format
          year
          season
          allTime
          context
          rank
        }
        popularity

        # ----------------------
        # Sidebar Data
        # ----------------------
        nextAiringEpisode {
          episode
          timeUntilAiring
        }
        format
        episodes
        duration
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        season
        seasonYear
        studios {
          edges {
            isMain
          }
          nodes {
            id
            name
          }
        }
        source
        genres
        synonyms
        
        # ----------------------
        # Trailer
        # ----------------------
        trailer {
          id
          site
        }

        # ----------------------
        # Reviews
        # ----------------------
        reviews(perPage: 6, sort: RATING_DESC) {
          nodes {
            id
            summary
            user {
              avatar {
                medium
              }
            }
          }
        }
      }
    }`

  const variables = {
    id: params.id,
  }

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
    return data.data.Media
  }
}

export default fetchAnimeDetails
