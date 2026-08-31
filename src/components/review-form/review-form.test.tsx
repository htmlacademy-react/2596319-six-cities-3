import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewForm from './review-form';
import * as reactRedux from 'react-redux';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('Component: ReviewForm', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockReturnValue({
      unwrap: () => Promise.resolve(),
    });
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
  });

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

  it('should enable submit button when rating is selected and review text length is valid', async () => {
    render(
      <ReviewForm offerId="1" onCommentSubmit={vi.fn()} />
    );

    const ratingStars = screen.getAllByRole('radio');
    const reviewTextarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const validReviewText = 'A'.repeat(55);

    await userEvent.click(ratingStars[0]);
    await userEvent.type(reviewTextarea, validReviewText);

    expect(submitButton).toBeEnabled();
  });

  it('should call onCommentSubmit when form is submitted with valid data', async () => {
    const handleCommentSubmit = vi.fn();

    render(
      <ReviewForm offerId="1" onCommentSubmit={handleCommentSubmit} />
    );

    const ratingStars = screen.getAllByRole('radio');
    const reviewTextarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const validReviewText = 'A'.repeat(125);

    await userEvent.click(ratingStars[0]);
    await userEvent.type(reviewTextarea, validReviewText);
    await userEvent.click(submitButton);

    expect(handleCommentSubmit).toHaveBeenCalledTimes(1);
  });
});
