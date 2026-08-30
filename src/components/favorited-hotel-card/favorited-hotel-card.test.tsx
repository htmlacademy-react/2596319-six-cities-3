import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import FavoritedHotelCard from './favorited-hotel-card';
import { TOffer } from '../../const/types';

vi.mock('../bookmark/bookmark', () => ({
  default: () => <button data-testid="bookmark-button">Bookmark</button>,
}));

const mockOffer: TOffer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  rating: 4.5,
  isPremium: true,
  isFavorite: true,
  previewImage: 'img/apartment-01.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
};

describe('Component: FavoritedHotelCard', () => {
  it('should render with correct hotel details and offer link', () => {
    render(
      <MemoryRouter>
        <FavoritedHotelCard card={mockOffer} />
      </MemoryRouter>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', 'img/apartment-01.jpg');
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
  });
});
