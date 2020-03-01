import { spreadNumber } from '../reducers/spreadReducer.js'

describe('spreadNumber', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = 4;
    const result = spreadNumber(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_SPREAD', () => {
    const mockSpreadNumber = 3;
    const mockAction = {
      type: 'ADD_SPREAD',
      user: mockSpreadNumber,
    }
    const expected = 3;
    const result = spreadNumber(mockState, mockAction);
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is LOGOUT', () => {
    const mockUser = {name: 'Robbie', id: 10};
    const mockState = {name: 'Robbie', id: 10};
    const mockAction = {
      type: 'LOGOUT',
      user: mockUser,
    }
    const expected = {};
    const result = user(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
