import React from 'react';
import { ReadingPreview, mapDispatchToProps } from './ReadingPreview';
import { addReading } from '../../actions';
import { shallow } from 'enzyme';

describe('ReadingPreview', () => {

  let wrapper;
  let mockReading;
  let mockState;

  beforeEach(() => {
    mockReading = {cards: [{name: 'The Moon'}], question: 'Is bithcuits a bad kitty?', fortune: 'Cheaters never prosper', id: 30};
    wrapper = shallow(<ReadingPreview reading={mockReading} />);
  });

  describe('ReadingPreview container/component', () => {
    it ('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call makeSavedReadingCurrentReading when updateCurrentReading is invoked', () => {
      let mockSavedReading = jest.fn().mockImplementation();
      wrapper = shallow(<ReadingPreview reading={mockReading} makeSavedReadingCurrentReading={mockSavedReading} />);

      wrapper.instance().updateCurrentReading(mockReading);
      expect(mockSavedReading).toHaveBeenCalledWith(mockReading);
    });

    it('should call updateCurrentReading when view reading button is clicked', () => {
      wrapper.instance().updateCurrentReading = jest.fn();
      wrapper.instance().forceUpdate()
      wrapper.find('.view-reading-btn').simulate('click')
      expect(wrapper.instance().updateCurrentReading).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the addReading action when updateCurrentReading is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addReading(mockReading);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.makeSavedReadingCurrentReading(mockReading);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});
