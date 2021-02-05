import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/features/user';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Home />);
  expect(renderedComponent.find('.user-home').length).toBe(1);
});
