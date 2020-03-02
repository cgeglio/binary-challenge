import React from 'react';
import { ReadingStarter, mapDispatchToProps, mapStateToProps } from './ReadingStarter';
import { addQuestion, addSpread, removeReading } from '../../actions';
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
      expect(wrapper.state()).toEqual({question: '', spread: 4, error: null});
    });

    it('should set state with a question when handleChange is called', () => {
      const mockEvent = {
        target: {name: 'question', value: 'Is the sky blue?'},
        preventDefault: jest.fn()
      }
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state()).toEqual({question: 'Is the sky blue?', spread: 4, error: null});
    });

    it('should verify question input when verifyQuestionInput is called and call startReading', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().startReading = jest.fn();
      wrapper.instance().setState({question: 'Is the sky blue?', error: null})

      wrapper.instance().verifyQuestionInput(mockEvent)
      expect(wrapper.instance().startReading).toHaveBeenCalled();
    });

    it('should set state with an error if there is not a question input', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().startReading = jest.fn();

      wrapper.instance().verifyQuestionInput(mockEvent)
      expect(wrapper.state('error')).toEqual('Please submit a question for your reading.');
    });

    it('should call updateQuestion, removeReading, updateSpreadNumber and reset state when startReading is called', () => {
      const mockUpdateQuestion = jest.fn().mockImplementation();
      const mockUpdateSpreadNumber = jest.fn().mockImplementation();
      const mockRemoveReading = jest.fn().mockImplementation();
      const expected = {question: '', spread: 4, error: null};
      wrapper = shallow(<ReadingStarter
        currentReading={{cards: [{name: 'The Magician', value: 8}]}}
        user={mockUser}
        updateQuestion={mockUpdateQuestion}
        updateSpreadNumber={mockUpdateSpreadNumber}
        removeReading={mockRemoveReading}
      />);
      wrapper.instance().setState({question: 'Is the sky blue?'});

      wrapper.instance().startReading();
      expect(mockUpdateQuestion).toHaveBeenCalledWith('Is the sky blue?');
      expect(mockUpdateSpreadNumber).toHaveBeenCalledWith(4);
      expect(mockRemoveReading).toHaveBeenCalledWith({cards: [{name: 'The Magician', value: 8}]});
      expect(wrapper.state()).toEqual(expected);
    });

    it('should call verifyQuestionInput when ask the cards button is clicked', () => {
      wrapper.instance().verifyQuestionInput = jest.fn();
      wrapper.instance().forceUpdate()
      wrapper.find('.ask-btn').simulate('click')
      expect(wrapper.instance().verifyQuestionInput).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return a user object and a current reading', () => {
      const mockDispatch = jest.fn();
      wrapper = shallow(<ReadingStarter />);
      const mockState = {
        user: {name: 'Bithcuits', id: 9},
        currentReading: {cards: [{name: 'The Magician', value: 8}]},
        cards: [{name: 'The Magician', value: 8}]};
      const expected = {
        user: {name: 'Bithcuits', id: 9},
        currentReading: {cards: [{name: 'The Magician', value: 8}]}};
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

    it('should call dispatch with the addSpread action when startReading is called', () => {
      const mockSpreadNumber = 3;
      const mockDispatch = jest.fn();
      const actionToDispatch = addSpread(mockSpreadNumber);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.updateSpreadNumber(mockSpreadNumber);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should call dispatch with the removeReading action when startReading is called', () => {
      const mockReading = {cards: [{name: 'The Magician', value: 8}]};
      const mockDispatch = jest.fn();
      const actionToDispatch = removeReading(mockReading);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.removeReading(mockReading);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
