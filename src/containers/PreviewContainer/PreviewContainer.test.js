import React from 'react';
import { PreviewContainer, mapStateToProps } from './PreviewContainer';
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
    it('should return an array of favorites', () => {
      const mockDispatch = jest.fn();
      const mockFavorites = {cards: [{name: 'The Magician'}], id: 20};
      const wrapper = shallow(<PreviewContainer favorites={mockFavorites} />);
      const mockState = {
        user: {user: {name: 'Bithcuits', id: 9} },
        favorites: [
          {cards: [{name: 'The Magician'}], id: 20},
          {cards: [{name: 'The Moon'}], id: 10}
        ]
      };
      const expected = {favorites: [
        {cards: [{name: 'The Magician'}], id: 20},
        {cards: [{name: 'The Moon'}], id: 10}
      ]};
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });

});
