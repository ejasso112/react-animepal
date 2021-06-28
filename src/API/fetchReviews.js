const fetchReviews = async (params = { id: NaN, Page: NaN }) => {
  const query = `
    query ($id: Int, $page: Int) {
      Media(id: $id) {
        reviews(page: $page, sort: RATING_DESC) {
          pageInfo {
            hasNextPage
          }
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
    page: params.page,
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
    return data.data.Media.reviews
  }
}

export default fetchReviews
