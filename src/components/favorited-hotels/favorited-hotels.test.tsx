import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import FavoritedHotels from './favorited-hotels';
import { TOffer } from '../../const/types';

vi.mock('../favorited-hotel-card/favorited-hotel-card', () => ({
  default: ({ card }: { card: TOffer }) => (
    <div data-testid="hotel-card">{card.title}</div>
  ),
}));

const mockOffers: TOffer[] = [
  {
    id: '1',
    title: 'Paris Apartment',
    type: 'apartment',
    price: 120,
    rating: 4,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/1.jpg',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
  {
    id: '2',
    title: 'Cologne Hotel',
    type: 'room',
    price: 80,
    rating: 3,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/2.jpg',
    city: { name: 'Cologne', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
  {
    id: '3',
    title: 'Not Favorite Hotel',
    type: 'room',
    price: 50,
    rating: 2,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/3.jpg',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
];

describe('Component: FavoritedHotels', () => {
  it('should render favorite cities and filtered hotel cards correctly', () => {
    render(
      <MemoryRouter>
        <FavoritedHotels offers={mockOffers} />
      </MemoryRouter>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();

    const hotelCards = screen.getAllByTestId('hotel-card');
    expect(hotelCards).toHaveLength(2);
    expect(screen.getByText('Paris Apartment')).toBeInTheDocument();
    expect(screen.getByText('Cologne Hotel')).toBeInTheDocument();
    expect(screen.queryByText('Not Favorite Hotel')).not.toBeInTheDocument();
  });
});
