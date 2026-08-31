import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReviewsContainer from './reviews-container';
import { TReview } from '../../const/types';

vi.mock('../review/review', () => ({
  default: ({ review }: { review: TReview }) => (
    <li data-testid="review-item">{review.comment}</li>
  ),
}));

const mockReviews: TReview[] = [
  {
    id: '1',
    date: '2023-01-01T12:00:00.000Z',
    user: { name: 'mock username 1', avatarUrl: 'img/1.jpg', isPro: false },
    comment: 'an older review',
    rating: 4,
  },
  {
    id: '2',
    date: '2023-05-01T12:00:00.000Z',
    user: { name: 'mock username 2', avatarUrl: 'img/2.jpg', isPro: true },
    comment: 'a newer review',
    rating: 5,
  },
];

describe('Component: ReviewsContainer', () => {
  it('should render reviews count, list of reviews, and sort them by date descending', () => {
    render(<ReviewsContainer reviews={mockReviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems).toHaveLength(2);

    expect(reviewItems[0]).toHaveTextContent('a newer review');
    expect(reviewItems[1]).toHaveTextContent('an older review');
  });
});
