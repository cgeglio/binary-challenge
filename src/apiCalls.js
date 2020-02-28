export const getCards = () => {
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=4'
  return fetch(proxyUrl + targetUrl)
    .then(response => {
      if (!response.ok) {
        throw Error('Error fetching cards')
      }
      return response.json()
    })
}

export const getFortune = () => {
  return fetch('http://fortunecookieapi.herokuapp.com/v1/fortunes/')
    .then(response => {
      if (!response.ok) {
        throw Error('Error fetching fortune')
      }
      return response.json()
    })
}
