import React from 'react';
import { Nav, mapStateToProps, mapDispatchToProps } from './Nav';
import { logout, resetFavorites, removeReading, removeQuestion } from '../../actions';
import { shallow } from 'enzyme';

describe('Nav', () => {

  let wrapper;
  let mockUser;
  let mockFavorites;
  let mockCards;
  let mockQuestion;
  let mockFortune;
  let mockReading

  beforeEach(() => {
    mockUser = {name: 'Bithcuits', id: 50}
    mockFavorites = [{cards: [{name: 'The Magician', id: 28}]}];
    mockCards = [{name: 'The Moon'}];
    mockQuestion = 'Is the sky blue?';
    mockFortune = 'Two wrongs don\'t make a right'
    mockReading = {cards: [{name: 'The Magician', id: 28}], id: 30}
    wrapper = shallow(<Nav user={mockUser} favorites={mockFavorites} />);
  });

  describe('Nav container/component', () => {
    it ('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it ('should call logoutUser, resetFavorites, removeCards, removeQuestion, removeFortune, removeReading when the logout button is clicked', () => {
      let mockLogout = jest.fn().mockImplementation();
      let mockResetFavorites = jest.fn().mockImplementation();
      let mockRemoveQuestion = jest.fn().mockImplementation();
      let mockRemoveReading = jest.fn().mockImplementation();
      wrapper = shallow(<Nav
        user={mockUser}
        favorites={mockFavorites}
        question={mockQuestion}
        currentReading={mockReading}
        logoutUser={mockLogout}
        resetFavorites={mockResetFavorites}
        removeQuestion={mockRemoveQuestion}
        removeReading={mockRemoveReading}
      />);
      wrapper.find('#logout-btn').simulate('click');
      expect(mockLogout).toHaveBeenCalledWith(mockUser);
      expect(mockResetFavorites).toHaveBeenCalledWith(mockFavorites);
      expect(mockRemoveQuestion).toHaveBeenCalledWith(mockQuestion);
      expect(mockRemoveReading).toHaveBeenCalledWith(mockReading);
    });
  });

  describe('mapStateToProps', () => {
    it('should return a user, an array of favorites, a question, and a current reading', () => {
      const mockDispatch = jest.fn();
      const mockState = {
        user: mockUser,
        favorites: mockFavorites,
        question: mockQuestion,
        fortune: mockFortune,
        cards: mockCards,
        currentReading: mockReading,
        testKey: 'test value'
      }
      const expected = {
        user: mockUser,
        favorites: mockFavorites,
        question: mockQuestion,
        currentReading: mockReading
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the logout action when the logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = logout(mockUser);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.logoutUser(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should call dispatch with the remove question action when the logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = removeQuestion(mockQuestion);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeQuestion(mockQuestion);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should call dispatch with the remove reading action when the logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = removeReading(mockReading);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeReading(mockReading);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should call dispatch with the reset favorites action when the logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = resetFavorites(mockFavorites);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.resetFavorites(mockFavorites);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
