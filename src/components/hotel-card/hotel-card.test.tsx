import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import HotelCard from './hotel-card';
import { TOffer } from '../../const/types';

vi.mock('../bookmark/bookmark', () => ({
  default: () => <button data-testid="bookmark-button">Bookmark</button>,
}));

const mockOffer: TOffer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  rating: 4,
  isPremium: true,
  isFavorite: false,
  previewImage: 'img/apartment-01.jpg',
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
};

describe('Component: HotelCard', () => {
  it('should render with correct hotel elements and props', () => {
    const handleHoverMock = vi.fn();

    render(
      <MemoryRouter>
        <HotelCard
          card={mockOffer}
          onHover={handleHoverMock}
          className="custom-card-class"
          imageWrapperClassName="custom-image-wrapper"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', 'img/apartment-01.jpg');
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/offer/1');
    expect(links[1]).toHaveAttribute('href', '/offer/1');
  });
});
