import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hotels from './hotels';
import { TOffer } from '../../const/types';

vi.mock('../hotel-card/hotel-card', () => ({
  default: ({ card }: { card: TOffer }) => (
    <div data-testid="hotel-card">{card.title}</div>
  ),
}));

vi.mock('../hotels-sort/hotels-sort', () => ({
  default: () => <div data-testid="hotels-sort">Sort Component</div>,
}));

const mockOffers: TOffer[] = [
  {
    id: '1',
    title: 'First Hotel',
    type: 'apartment',
    price: 100,
    rating: 4,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/1.jpg',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
  {
    id: '2',
    title: 'Second Hotel',
    type: 'hotel',
    price: 200,
    rating: 5,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/2.jpg',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
];

describe('Component: Hotels', () => {
  it('should render with correct places count text and list of hotel cards', () => {
    const handleHoverMock = vi.fn();

    render(
      <Hotels
        offers={mockOffers}
        activeCity="Paris"
        handleHover={handleHoverMock}
      />
    );

    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByTestId('hotels-sort')).toBeInTheDocument();

    const hotelCards = screen.getAllByTestId('hotel-card');
    expect(hotelCards).toHaveLength(2);
    expect(screen.getByText('First Hotel')).toBeInTheDocument();
    expect(screen.getByText('Second Hotel')).toBeInTheDocument();
  });

  it('should render correct singular place count text when offers length is 1', () => {
    render(
      <Hotels
        offers={[mockOffers[0]]}
        activeCity="Amsterdam"
        handleHover={vi.fn()}
      />
    );

    expect(screen.getByText('1 place to stay in Amsterdam')).toBeInTheDocument();
  });
});
