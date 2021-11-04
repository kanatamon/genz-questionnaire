function queryString(params) {
  return Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')
}

export async function getData(url = '', queryParams = {}) {
  const urlWithQueryParams = `${url}?${queryString(queryParams)}`
  const response = await fetch(urlWithQueryParams)
  const responseData = await response.json()
  return responseData
}

export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseData = await response.json()
  return responseData
}
