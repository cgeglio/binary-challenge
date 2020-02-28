import React from 'react';
import { ReadingStarter, mapDispatchToProps, mapStateToProps } from './ReadingStarter';
import { addQuestion } from '../../actions';
import { shallow } from 'enzyme';

describe('ReadingStarter', () => {

  let wrapper;
  let mockUser;

  beforeEach(() => {
    mockUser = {name: 'Bithcuits', id: 9};
    wrapper = shallow(<ReadingStarter user={mockUser} />);
  });

  describe('ReadingStarter container/component', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should start off with a default state', () => {
      expect(wrapper.state()).toEqual({question: '', error: null});
    });

    it('should set state with a question when changeQuestion is called', () => {
      const mockEvent = {
        target: {name: 'question', value: 'Is the sky blue?'},
        preventDefault: jest.fn()
      }
      wrapper.instance().changeQuestion(mockEvent);
      expect(wrapper.state()).toEqual({question: 'Is the sky blue?', error: null});
    });

    it('should verify question input when verifyInput is called and call startReading', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().startReading = jest.fn();
      wrapper.instance().setState({question: 'Is the sky blue?', error: null})

      wrapper.instance().verifyInput(mockEvent)
      expect(wrapper.instance().startReading).toHaveBeenCalled();
    });

    it('should set state with an error if there is not a question input', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().startReading = jest.fn();

      wrapper.instance().verifyInput(mockEvent)
      expect(wrapper.state('error')).toEqual('Please submit a question for your reading.');
    });

    it('should call updateQuestion and reset state when startReading is called', () => {
      const mockUpdate = jest.fn().mockImplementation();
      const expected = {question: '', error: null};
      wrapper = shallow(<ReadingStarter user={mockUser} updateQuestion={mockUpdate}/>);
      wrapper.instance().setState({question: 'Is the sky blue?'});

      wrapper.instance().startReading();
      expect(mockUpdate).toHaveBeenCalledWith('Is the sky blue?');
      expect(wrapper.state()).toEqual(expected);
    });

    it('should call verifyInput when ask the cards button is clicked', () => {
      wrapper.instance().verifyInput = jest.fn();
      wrapper.instance().forceUpdate()
      wrapper.find('.ask-btn').simulate('click')
      expect(wrapper.instance().verifyInput).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return a user object', () => {
      const mockDispatch = jest.fn();
      wrapper = shallow(<ReadingStarter />);
      const mockState = {user: {name: 'Bithcuits', id: 9}, cards: [{name: 'The Magician', value: 8}]};
      const expected = {user: {name: 'Bithcuits', id: 9} };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the addQuestion action when startReading is called', () => {
      const mockQuestion = 'Is the sky blue?';
      const mockDispatch = jest.fn();
      const actionToDispatch = addQuestion(mockQuestion);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.updateQuestion(mockQuestion);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
