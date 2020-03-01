import React from 'react';
import { About, mapDispatchToProps } from './About';
import { removeQuestion } from '../../actions';
import { shallow } from 'enzyme';

describe('About', () => {

  let mockResetQuestion;
  let wrapper;

  beforeEach(() => {
    mockResetQuestion = jest.fn().mockImplementation();
    wrapper = shallow(<About resetQuestion={mockResetQuestion} />);
  });

  describe('About container/component', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call resetQuestion when the home button is clicked', () => {
      wrapper.find('.back-btn').simulate('click');
      expect(mockResetQuestion).toHaveBeenCalledWith('question');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the removeQuestion action when resetQuestion is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = removeQuestion('question');
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.resetQuestion('question');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
