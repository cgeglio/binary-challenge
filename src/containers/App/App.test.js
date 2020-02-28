import React from 'react';
import { App, mapStateToProps } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it ('should match the snapshot', () => {
    let mockUser = {username: 'Bithcuits', id: 9}
    let mockCards = [{name: 'The Magiciam', value: 7}]
    let mockQuestion = 'Is Bithcuits a good kitty?'
    const wrapper = shallow(<App user={mockUser} cards={mockCards} question={mockQuestion}/>);

    expect(wrapper).toMatchSnapshot();
  })

  describe('mapStateToProps', () => {
    it('should return a user object, an array of cards, and a question', () => {
      let mockUser = {username: 'Bithcuits', id: 9}
      let mockCards = [{name: 'The Magiciam', value: 7}]
      let mockQuestion = 'Is Bithcuits a good kitty?'
      const wrapper = shallow(<App  user={mockUser} cards={mockCards} question={mockQuestion} />);
      const mockDispatch = jest.fn();
      const mockState = {
        user: {username: 'Bithcuits', id: 9},
        cards: [{name: 'The Magiciam', value: 7}],
        question: 'Is Bithcuits a good kitty?',
        fortune: 'Keep your friends close and your enemies closer',
      }
      const expected = {
        user: {username: 'Bithcuits', id: 9},
        cards: [{name: 'The Magiciam', value: 7}],
        question: 'Is Bithcuits a good kitty?',
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });
})
