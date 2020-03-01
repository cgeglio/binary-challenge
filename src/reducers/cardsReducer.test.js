import { cards } from '../reducers/cardsReducer.js'

describe('cards', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = [];
    const result = cards(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_CARDS', () => {
    const mockCards = [{ name: 'The Magician', value: 11 }]
    const mockState = [{ name: 'The Moon', value: 8 }];
    const mockAction = {
      type: 'ADD_CARDS',
      cards: mockCards,
    }
    const expected = [{ name: 'The Magician', value: 11 }]
    const result = cards(mockState, mockAction);
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is REMOVE_CARDS', () => {
    const mockCards = [{ name: 'The Magician', value: 11 }]
    const mockState = [{ name: 'The Moon', value: 8 }];
    const mockAction = {
      type: 'REMOVE_CARDS',
      cards: mockCards,
    }
    const expected = []
    const result = cards(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
