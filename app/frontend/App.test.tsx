import { App } from '@/App';
import { render } from '@testing-library/react';

describe("Our application", () => {
  test("Renders without crashing", () => {
    render(<App />);
  })
})
