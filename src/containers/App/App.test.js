import React from 'react';
import { App, mapStateToProps } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it ('should match the snapshot', () => {
    let mockUser = {username: 'Bithcuits', id: 9}
    let mockQuestion = 'Is Bithcuits a good kitty?'
    const wrapper = shallow(<App user={mockUser}  question={mockQuestion}/>);

    expect(wrapper).toMatchSnapshot();
  })

  describe('mapStateToProps', () => {
    it('should return a user object and a question', () => {
      let mockUser = {username: 'Bithcuits', id: 9}
      let mockQuestion = 'Is Bithcuits a good kitty?'
      const wrapper = shallow(<App  user={mockUser}  question={mockQuestion} />);
      const mockDispatch = jest.fn();
      const mockState = {
        user: {username: 'Bithcuits', id: 9},
        cards: [{name: 'The Magiciam', value: 7}],
        question: 'Is Bithcuits a good kitty?',
        currentReading: {cards: [{name: 'The Magiciam', value: 7}], id: 40},
        fortune: 'Keep your friends close and your enemies closer',
      }
      const expected = {
        user: {username: 'Bithcuits', id: 9},
        question: 'Is Bithcuits a good kitty?',
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });
})
