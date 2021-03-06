import { getCards, getDeck, getFortune } from './apiCalls';

describe('getCards', () => {
  let mockResponse = {cards: [
    {name: 'The Magician', value: 5},
    {name: 'The Moon', value: 10}
  ]}

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=4'
    getCards(4);
    expect(window.fetch).toHaveBeenCalledWith(proxyUrl + targetUrl)
  });

  it('should return an object with a key of cards', () => {
    getCards()
      .then(movies => expect(movies).toEqual(mockResponse));
  });

  it('should return an error if the response is not okay', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Error fetching cards'))
    })
    expect(getCards()).rejects.toEqual(Error('Error fetching cards'))
  });
});

describe('getDeck', () => {
  let mockResponse = [{name: 'The Magician'}, {name: 'The Moon'}];

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://rws-cards-api.herokuapp.com/api/v1/cards'
    getDeck();
    expect(window.fetch).toHaveBeenCalledWith(proxyUrl + targetUrl)
  });

  it('should return a deck of cards in the form of an array', () => {
    getFortune()
      .then(deck => expect(deck).toEqual(mockResponse));
  });

  it('should return an error if the response is not okay', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Error fetching deck'))
    })
    expect(getFortune()).rejects.toEqual(Error('Error fetching deck'))
  });
});

describe('getFortune', () => {
  let mockResponse = 'The early bird gets the worm.'

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    let expected = 'https://fortunecookieapi.herokuapp.com/v1/fortunes/'
    getFortune();
    expect(window.fetch).toHaveBeenCalledWith(expected)
  });

  it('should return a fortune in the form of a string', () => {
    getFortune()
      .then(fortune => expect(fortune).toEqual(mockResponse));
  });

  it('should return an error if the response is not okay', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Error fetching fortune'))
    })
    expect(getFortune()).rejects.toEqual(Error('Error fetching fortune'))
  });
});
