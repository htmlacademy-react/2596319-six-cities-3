import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReviewForm from './review-form';

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

describe('Component: ReviewForm', () => {
  it('should render form elements correctly in initial state', () => {
    render(
      <ReviewForm offerId="1" onCommentSubmit={vi.fn()} />
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
