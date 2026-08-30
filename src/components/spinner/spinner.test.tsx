import { Spinner } from './spinner';
import {render, screen} from '@testing-library/react';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<Spinner />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
