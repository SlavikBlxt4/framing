import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from '../ThemedText';

test('renders correctly', () => {
  const { getByText } = render(<ThemedText>Snapshot test!</ThemedText>);
  expect(getByText('Snapshot test!')).toBeTruthy();
});
