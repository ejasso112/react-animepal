const fetchAnimeDetails = async (params) => {
  const query = `
    query ($id: Int) {
      Media(id: $id) {
        id
        idMal
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
