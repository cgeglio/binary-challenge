import React from 'react';
import { FavoriteContainer, mapDispatchToProps, mapStateToProps } from './FavoriteContainer';
import { addFavorite, removeFavorite, addCards, addFortune } from '../../actions';
import save from '../../images/save.png';
import saved from '../../images/saved.png';
import { shallow } from 'enzyme';

describe('FavoriteContainer', () => {

  let wrapper;
  let mockFortune;
  let mockCurrentReading;
  let mockAddReading;
  let mockRemoveReading;

  beforeEach(() => {
    mockFortune = 'Keep your friends close and your enemies closer';
    mockCurrentReading = {
      cards: [{name: 'The Moon', value: 6}], question: 'Is Bithcuits a good kitty?', fortune: 'Keep your friends close and your enemies closer',
      id: 25,
      saved: false
    };
    mockAddReading = jest.fn().mockImplementation();
    mockRemoveReading = jest.fn().mockImplementation();
    wrapper = shallow(<FavoriteContainer
       fortune={mockFortune}
       currentReading={mockCurrentReading}
       addReadingToFavorites={mockAddReading}
       removeReadingFromFavorites={mockRemoveReading}
    />);
  });

  describe('FavoriteContainer container/component', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should start with a default state', () => {
      expect(wrapper.state()).toEqual({icon: save})
    })

    it('should call saveReading if the reading has not been saved yet', () => {
      wrapper.instance().saveReading = jest.fn();
      wrapper.instance().updateSavedStatus();
      expect(wrapper.instance().saveReading).toHaveBeenCalled();
    })

    it('should call removeReading if the reading is already saved', () => {
      mockCurrentReading.saved = true;
      wrapper.instance().removeReading = jest.fn();
      wrapper.instance().updateSavedStatus();
      expect(wrapper.instance().removeReading).toHaveBeenCalled();
    })

    it('should set state, update the current reading\'s saved value, and call addReadingToFavorites when saveReading is invoked', () => {
      const expected = {
        cards: [{name: 'The Moon', value: 6}], question: 'Is Bithcuits a good kitty?', fortune: 'Keep your friends close and your enemies closer',
        id: 25,
        saved: true
      };
      wrapper.instance().saveReading();
      expect(wrapper.state()).toEqual({icon: saved})
      expect(mockAddReading).toHaveBeenCalledWith(expected);
    })

    it('should set state, update the current reading\'s saved value, and call removeReadingFromFavorites when removeReading is invoked ', () => {
      mockCurrentReading.saved = true;
      const expected = {
        cards: [{name: 'The Moon', value: 6}], question: 'Is Bithcuits a good kitty?', fortune: 'Keep your friends close and your enemies closer',
        id: 25,
        saved: false
      };
      wrapper.instance().removeReading();
      expect(wrapper.state()).toEqual({icon: save})
      expect(mockRemoveReading).toHaveBeenCalledWith(expected);
    })

    it('should be able to determine which icon to display', () => {
      expect(wrapper.instance().determineIcon()).toEqual(save);

      mockCurrentReading.saved = true;
      expect(wrapper.instance().determineIcon()).toEqual(saved);
    })

    it('should call updateSavedStatus when the save button is clicked', () => {
      wrapper.instance().updateSavedStatus = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.find('.save-btn').simulate('click');
      expect(wrapper.instance().updateSavedStatus).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return a current reading object', () => {
      const mockDispatch = jest.fn();
      const mockState = {
        user: {name: 'Bithcuits', id: 9},
        question: 'Is Bithcuits a good kitty?',
        fortune: 'Keep your friends close and your enemies closer',
        currentReading: {
          cards: [{name: 'The Moon', value: 6}],
          question: 'Is Bithcuits a good kitty?',
          fortune: 'Keep your friends close and your enemies closer',
          id: 25,
          saved: false
        }
      }
      const expected = {
        currentReading: {
          cards: [{name: 'The Moon', value: 6}],
          question: 'Is Bithcuits a good kitty?',
          fortune: 'Keep your friends close and your enemies closer',
          id: 25,
          saved: false
        }
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the addFavorite action when addReadingToFavorites is called', () => {
      const mockFavorite = {cards: [{name: 'The Magician', value: 9}]};
      const mockDispatch = jest.fn();
      const actionToDispatch = addFavorite(mockFavorite);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addReadingToFavorites(mockFavorite);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should call dispatch with the removeFavorite action when removeReadingFromFavorites is called', () => {
      const mockFavorite = {cards: [{name: 'The Moon', value: 6}]};
      const mockDispatch = jest.fn();
      const actionToDispatch = removeFavorite(mockFavorite);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.removeReadingFromFavorites(mockFavorite);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
