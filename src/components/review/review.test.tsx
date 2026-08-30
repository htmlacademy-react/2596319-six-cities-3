import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Review from './review';
import { TReview } from '../../const/types';

const mockReview: TReview = {
  id: '1',
  date: '2023-05-18T14:13:56.569Z',
  user: {
    name: 'test username',
    avatarUrl: '../../../public/img/avatar-max.jpg',
    isPro: false,
  },
  comment: 'A quiet cozy and picturesque that hides behind a a river.',
  rating: 4,
};

describe('Component: Review', () => {
  it('should render correctly with given review data', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('test username')).toBeInTheDocument();
    expect(
      screen.getByText('A quiet cozy and picturesque that hides behind a a river.')
    ).toBeInTheDocument();

    const avatarImage = screen.getByAltText('Reviews avatar');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      'src',
      '../../../public/img/avatar-max.jpg'
    );

    const timeElement = screen.getByText('May 2023');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2023-05-18');
  });
});
