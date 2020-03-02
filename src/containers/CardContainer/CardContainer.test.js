import React from 'react';
import { CardContainer, mapDispatchToProps, mapStateToProps } from './CardContainer';
import { addFavorite, removeFavorite, addReading, removeQuestion} from '../../actions';
import save from '../../images/save.png';
import saved from '../../images/saved.png';
import { shallow } from 'enzyme';
import { getCards, getFortune } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('CardContainer', () => {

  let wrapper;
  let mockSpreadNumber;
  let mockQuestion;
  let mockCurrentReading;
  let mockAddReading;
  let mockAddFavorite;
  let mockRemoveFavorite;
  let mockRemoveQuestion;

  beforeEach(() => {
    mockSpreadNumber = 2;
    mockQuestion = 'Is the sky blue?'
    mockCurrentReading = {
      cards: [{name: 'The Moon', value: 6}], question: 'Is Bithcuits a good kitty?', fortune: 'Keep your friends close and your enemies closer',
      id: 25,
      saved: false
    };

    mockAddReading = jest.fn().mockImplementation();
    mockAddFavorite = jest.fn().mockImplementation();
    mockRemoveFavorite = jest.fn().mockImplementation();
    mockRemoveQuestion = jest.fn().mockImplementation();

    getCards.mockImplementation(() => {
      return Promise.resolve({cards:[
        {name: 'The Sun', value: 8},
        {name: 'The Hermit', value: 12}
      ]});
    });

    getFortune.mockImplementation(() => {
      return Promise.resolve([{message: 'The early bird gets the worm'}]);
    });

    wrapper = shallow(<CardContainer
       question={mockQuestion}
       currentReading={mockCurrentReading}
       addReadingToStore={mockAddReading}
       addReadingToFavorites={mockAddFavorite}
       removeReadingFromFavorites={mockRemoveFavorite}
       resetQuestionInStore={mockRemoveQuestion}
    />);
  });

  describe('CardContainer container/component', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should start with a default state', () => {
      expect(wrapper.state()).toEqual({icon: save, cards: [
        {name: 'The Sun', value: 8},
        {name: 'The Hermit', value: 12}
      ]});
    })

    it('should call getFortune when fetchFortune is called', () => {
      wrapper.instance().fetchFortune();
      expect(getFortune).toHaveBeenCalled();
    })

    it('should call addReadingToStore when addCurrentReading is called', () => {
      global.Date.now = jest.fn().mockImplementation(() => 12345)
      wrapper.instance().setState({cards: [{name: 'The Moon', value: 6}]})
      const expected = {
        cards: [{name: 'The Moon', value: 6}],
        fortune: 'The early bird gets the worm',
        question: mockQuestion,
        id: 12345,
        saved: false
      }
      wrapper.instance().addCurrentReading('The early bird gets the worm');
      expect(mockAddReading).toHaveBeenCalledWith(expected);
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
      expect(wrapper.state()).toEqual({icon: saved, cards:[
        {name: 'The Sun', value: 8},
        {name: 'The Hermit', value: 12}
      ]})
      expect(mockAddFavorite).toHaveBeenCalledWith(expected);
    })

    it('should set state, update the current reading\'s saved value, and call removeReadingFromFavorites when removeReading is invoked ', () => {
      mockCurrentReading.saved = true;
      const expected = {
        cards: [{name: 'The Moon', value: 6}], question: 'Is Bithcuits a good kitty?', fortune: 'Keep your friends close and your enemies closer',
        id: 25,
        saved: false
      };
      wrapper.instance().removeReading();
      expect(wrapper.state()).toEqual({icon: save, cards:[
        {name: 'The Sun', value: 8},
        {name: 'The Hermit', value: 12}
      ]})
      expect(mockRemoveFavorite).toHaveBeenCalledWith(expected);
    })

    it('should be able to determine which icon to display', () => {
      expect(wrapper.instance().determineIcon()).toEqual(save);
      mockCurrentReading.saved = true;
      expect(wrapper.instance().determineIcon()).toEqual(saved);
    })

    it('should call resetQuestionInStore when resetInfo is called', () => {
      wrapper.instance().resetInfo()
      expect(mockRemoveQuestion).toHaveBeenCalledWith(mockQuestion);
    })

    it('should call updateSavedStatus when the save button is clicked', () => {
      wrapper.instance().updateSavedStatus = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.find('.save-btn').simulate('click');
      expect(wrapper.instance().updateSavedStatus).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return a question, a spread number, and a current reading object', () => {
      const mockDispatch = jest.fn();
      const mockState = {
        spreadNumber: 3,
        user: {name: 'Bithcuits', id: 9},
        cards: [{name: 'The Hermit', value: 3}],
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
        spreadNumber: 3,
        question: 'Is Bithcuits a good kitty?',
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

    it('should call dispatch with the addReading action when addReadingToStore is called', () => {
      const mockReading = {cards: [{name: 'The Magician', value: 9}], id: 8};
      const mockDispatch = jest.fn();
      const actionToDispatch = addReading(mockReading);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addReadingToStore(mockReading);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

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

    it('should call dispatch with the removeQuestion action when resetQuestionInStore is called', () => {
      const mockQuestion = 'Is the sky blue?';
      const mockDispatch = jest.fn();
      const actionToDispatch = removeQuestion(mockQuestion);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.resetQuestionInStore(mockQuestion);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
