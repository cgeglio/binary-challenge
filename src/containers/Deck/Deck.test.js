import React from 'react';
import { Deck, mapDispatchToProps } from './Deck';
import { removeQuestion } from '../../actions';
import { shallow } from 'enzyme';
import { getDeck } from '../../apiCalls';
import { mockRandom } from 'jest-mock-random';

jest.mock('../../apiCalls');

describe('Deck', () => {

  let mockResetQuestion;
  let wrapper;

  beforeEach(() => {
    mockResetQuestion = jest.fn().mockImplementation();
    mockRandom([.01]);

    getDeck.mockImplementation(() => {
      return Promise.resolve({cards: [
        {name: 'The Sun', value: 8},
        {name: 'The Hermit', value: 12}
      ]});
    });

    wrapper = shallow(<Deck resetQuestion={mockResetQuestion} />);
  });

  describe('Deck container/component', () => {
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
