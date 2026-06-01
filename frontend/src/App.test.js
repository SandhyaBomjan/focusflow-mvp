import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the focusflow welcome screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /^focusflow$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
});
