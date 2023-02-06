import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const registerElement = screen.getByText(/Register/i);
  expect(registerElement).toBeInTheDocument();
});
