import React from 'react';
import { shallow } from 'enzyme';
import { NewUserComfirInfo } from '../../../src/features/user';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NewUserComfirInfo />);
  expect(renderedComponent.find('.user-new-user-comfir-info').length).toBe(1);
});
