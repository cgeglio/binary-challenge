import { currentReading } from '../reducers/readingReducer.js'

describe('currentReading', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = {};
    const result = currentReading(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_READING', () => {
    const mockReading = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44};
    const mockState = {cards: [{name: 'The Moon'}], question: 'Is bithcuits a bad kitty?', fortune: 'Cheaters never prosper', id: 30};
    const mockAction = {
      type: 'ADD_READING',
      currentReading: mockReading,
    }
    const expected = {cards: [{name: 'The Magician'}], question: 'Is bithcuits a good kitty?', fortune: 'This too shall pass.', id: 44};
    const result = currentReading(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
