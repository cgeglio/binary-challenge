import { spreadNumber } from '../reducers/spreadReducer.js'

describe('spreadNumber', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = 4;
    const result = spreadNumber(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_SPREAD', () => {
    const mockSpreadNumber = 3;
    const mockState = 4;
    const mockAction = {
      type: 'ADD_SPREAD',
      spreadNumber: mockSpreadNumber,
    }
    const expected = 3;
    const result = spreadNumber(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
