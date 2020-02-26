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

// var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//     targetUrl = 'http://catfacts-api.appspot.com/api/facts?number=99'
// fetch(proxyUrl + targetUrl)
//   .then(blob => blob.json())
//   .then(data => {
//     console.table(data);
//     document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
//     return data;
//   })
//   .catch(e => {
//     console.log(e);
//     return e;
//   });
