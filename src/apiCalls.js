export const getCards = (spreadNumber) => {
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=${spreadNumber}`
  return fetch(proxyUrl + targetUrl)
    .then(response => {
      if (!response.ok) {
        throw Error('Error fetching cards')
      }
      return response.json()
    })
}

export const getDeck = () => {
  let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://rws-cards-api.herokuapp.com/api/v1/cards'
  return fetch(proxyUrl + targetUrl)
    .then(response => {
      if (!response.ok) {
        throw Error('Error fetching deck')
      }
      return response.json()
    })
}

export const getFortune = () => {
  return fetch('https://fortunecookieapi.herokuapp.com/v1/fortunes/')
    .then(response => {
      if (!response.ok) {
        throw Error('Error fetching fortune')
      }
      return response.json()
    })
}
