import { favorites } from '../reducers/favoritesReducer.js'

describe('favorites', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = [];
    const result = favorites(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_FAVORITE', () => {
    const mockFavorite = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    const mockState = [{cards: [{name: 'The Moon'}], question: 'Is bithcuits a bad kitty?', fortune: 'Cheaters never prosper', id: 30}];
    const mockAction = {
      type: 'ADD_FAVORITE',
      favorite: mockFavorite,
    }
    const expected = [
      {cards: [{name: 'The Moon'}], question: 'Is bithcuits a bad kitty?', fortune: 'Cheaters never prosper', id: 30},
      {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    ]
    const result = favorites(mockState, mockAction);
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is REMOVE_FAVORITE', () => {
    const mockFavorite = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    const mockState = [
      {cards: [{name: 'The Moon'}], question: 'Is bithcuits a bad kitty?', fortune: 'Cheaters never prosper', id: 30},
      {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44}
    ]
    const mockAction = {
      type: 'REMOVE_FAVORITE',
      favorite: mockFavorite,
    }
    const expected = [{cards: [{name: 'The Moon'}], question: 'Is bithcuits a bad kitty?', fortune: 'Cheaters never prosper', id: 30}]
    const result = favorites(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
