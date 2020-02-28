import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';

describe('Card', () => {
  it ('should match the snapshot', () => {
    const mockCard = {short_name: 'cu05'}
    const wrapper = shallow(<Card card={mockCard} />);
    expect(wrapper).toMatchSnapshot();
  })
})
