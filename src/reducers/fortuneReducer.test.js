import { fortune } from '../reducers/fortuneReducer.js'

describe('fortune', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = '';
    const result = fortune(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_FORTUNE', () => {
    const mockFortune = 'Marry in haste, regret in leisure';
    const mockState = 'Cheaters never prosper';
    const mockAction = {
      type: 'ADD_FORTUNE',
      fortune: mockFortune,
    }
    const expected = 'Marry in haste, regret in leisure';
    const result = fortune(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
