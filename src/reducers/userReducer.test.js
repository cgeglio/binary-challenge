import { user } from '../reducers/userReducer.js'

describe('user', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = {};
    const result = user(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is LOGIN', () => {
    const mockUser = {name: 'Robbie', id: 10};
    const mockState = {name: 'Eric', id: 5};
    const mockAction = {
      type: 'LOGIN',
      user: mockUser,
    }
    const expected = {name: 'Robbie', id: 10};
    const result = user(mockState, mockAction);
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
