import { question } from '../reducers/questionReducer.js'

describe('question', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = '';
    const result = question(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is ADD_QUESTION', () => {
    const mockQuestion = 'Is the sky blue?';
    const mockState = 'Is bithcuits a good kitty?';
    const mockAction = {
      type: 'ADD_QUESTION',
      question: mockQuestion,
    }
    const expected = 'Is the sky blue?';
    const result = question(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})
