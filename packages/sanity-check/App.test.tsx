import { render, screen } from '@testing-library/react';
import App from './App';

test('Application render', async () => {
  const { findByText } =  render(<App />);
  const welcomeMessage = await findByText("Frontegg - React");

  expect(welcomeMessage).toBeInTheDocument();
});
