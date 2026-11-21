import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Yash12007 home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Empowering minds through/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Featured Products/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Learn more about Yash Bodhe/i })).toHaveAttribute('target', '_blank');
});
