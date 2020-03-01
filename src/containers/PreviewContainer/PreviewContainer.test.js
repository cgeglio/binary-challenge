import React from 'react';
import { PreviewContainer, mapStateToProps, mapDispatchToProps } from './PreviewContainer';
import { removeQuestion } from '../../actions';
import { shallow } from 'enzyme';

describe('PreviewContainer', () => {

  describe('PreviewContainer container/component', () => {
    it ('should match the snapshot', () => {
      const mockFavorites = [{cards: {name: 'The Magician'}, id: 20}]
      const wrapper = shallow(<PreviewContainer favorites={mockFavorites} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an array of favorites and a question', () => {
      const mockDispatch = jest.fn();
      const mockFavorites = [{cards: [{name: 'The Magician'}], id: 20}];
      const wrapper = shallow(<PreviewContainer favorites={mockFavorites} />);
      const mockState = {
        user: {user: {name: 'Bithcuits', id: 9} },
        question: 'Is the sky blue?',
        favorites: [
          {cards: [{name: 'The Magician'}], id: 20},
          {cards: [{name: 'The Moon'}], id: 10}
        ]
      };
      const expected = {
        question: 'Is the sky blue?',
        favorites: [
          {cards: [{name: 'The Magician'}], id: 20},
          {cards: [{name: 'The Moon'}], id: 10}
      ]};
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the removeQuestion action when resetQuestion is called', () => {
      let mockResetQuestion = jest.fn().mockImplementation();
      let mockFavorites = [
        {cards: [{name: 'The Magician'}], id: 20},
        {cards: [{name: 'The Moon'}], id: 10}
      ];
      const wrapper = shallow(<PreviewContainer favorites={mockFavorites} removeQuestion={mockResetQuestion} />);
      const mockDispatch = jest.fn();
      const actionToDispatch = removeQuestion('question');
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.resetQuestion('question');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});
