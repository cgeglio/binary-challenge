import React from 'react';
import { Nav, mapStateToProps, mapDispatchToProps } from './Nav';
import { logout } from '../../actions';
import { shallow } from 'enzyme';

describe('Nav', () => {

  let wrapper;
  let mockUser;
  let mockFavorites;

  beforeEach(() => {
    mockUser = {name: 'Bithcuits', id: 50}
    mockFavorites = [{cards: [{name: 'The Magician', id: 28}]}];
    wrapper = shallow(<Nav user={mockUser} favorites={mockFavorites} />);
  });

  describe('Nav container/component', () => {
    it ('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it ('should call logoutUser when the logout button is clicked', () => {
      let mockLogout = jest.fn().mockImplementation();
      wrapper = shallow(<Nav user={mockUser} favorites={mockFavorites} logoutUser={mockLogout}/>);
      wrapper.find('#logout-btn').simulate('click');
      expect(mockLogout).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('mapStateToProps', () => {
    it('should return a user object and an array of favorites', () => {
      const mockDispatch = jest.fn();
      const mockState = {
        user: {name: 'Peanut', id: 7},
        favorites: [{name: 'The Moon', value: 8}],
        cards: [{name: 'The Sun', value: 4}]
      }
      const expected = {
        user: {name: 'Peanut', id: 7},
        favorites: [{name: 'The Moon', value: 8}]
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
  });
});
