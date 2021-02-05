import React from 'react';
import { shallow } from 'enzyme';
import { FormAddUser } from '../../../src/features/user';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormAddUser />);
  expect(renderedComponent.find('.user-form-add-user').length).toBe(1);
});
