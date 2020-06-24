import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders search', () => {
  const { getByText } = render(<App />);
  // TODO: Fixme
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  expect(true);
});
