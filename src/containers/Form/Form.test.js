import React from 'react';
import { Form, mapDispatchToProps } from './Form';
import { login } from '../../actions';
import { shallow } from 'enzyme';

describe('Form', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  describe('Form container/component', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should start off with a default state', () => {
      expect(wrapper.state()).toEqual({username: '', password: '', error: null});
    });

    it('should set state when handleChange is called', () => {
      const mockEvent = {
        target: {name: 'username', value: 'Bithcuits01'},
        preventDefault: jest.fn()
      }
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state()).toEqual({username: 'Bithcuits01', password: '', error: null});
    });

    it('should verify inputs when verifyInputs is called and call completeLogin', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().completeLogin = jest.fn();
      wrapper.instance().setState({username: 'Bithcuits01', password: '12345', error: null})

      wrapper.instance().verifyInputs(mockEvent)
      expect(wrapper.instance().completeLogin).toHaveBeenCalled();
    });

    it('should set state with an error if there is a missing input', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().completeLogin = jest.fn();

      wrapper.instance().verifyInputs(mockEvent)
      expect(wrapper.state('error')).toEqual('Enter a username & password to proceed.');
    });

    it('should call addUser and reset state when completeLogin is called', () => {
      global.Date.now = jest.fn().mockImplementation(() => 12345)
      const mockAddUser = jest.fn().mockImplementation();
      wrapper = shallow(<Form addUser={mockAddUser} />);
      wrapper.instance().setState({username: 'Bithcuits01', password: 'kitty', error: null});
      const mockEvent = { preventDefault: jest.fn() };

      wrapper.instance().completeLogin();
      expect(mockAddUser).toHaveBeenCalledWith({username: 'Bithcuits01',id: 12345});
      expect(wrapper.state()).toEqual({username: '', password: '', error: null});
    });

    it('should call verifyInputs when the login button is clicked', () => {
      wrapper.instance().verifyInputs = jest.fn();
      wrapper.instance().forceUpdate()
      wrapper.find('.login-submit-btn').simulate('click')
      expect(wrapper.instance().verifyInputs).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the login action when addUser is called', () => {
      const mockUser = {username: 'Bithcuits01', password: 'kitty', error: null};
      const mockDispatch = jest.fn();
      const actionToDispatch = login(mockUser);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addUser(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
