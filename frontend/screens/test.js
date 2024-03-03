import React from 'react';
import { render } from '@testing-library/react-native';
import Landing from './landing';

describe('Landing Page', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Landing />);
    expect(toJSON()).toMatchSnapshot();
  });
});
