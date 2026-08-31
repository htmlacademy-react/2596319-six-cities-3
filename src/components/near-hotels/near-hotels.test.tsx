import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NearHotels from './near-hotels';
import { TOffer } from '../../const/types';

vi.mock('../hotel-card/hotel-card', () => ({
  default: ({ card }: { card: TOffer }) => (
    <div data-testid="hotel-card">{card.title}</div>
  ),
}));

const mockOffers: TOffer[] = [
  {
    id: '1',
    title: 'Near Hotel 1',
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
    title: 'Near Hotel 2',
    type: 'room',
    price: 80,
    rating: 5,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/2.jpg',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
];

describe('Component: NearHotels', () => {
  it('should render list of near hotel cards correctly', () => {
    render(<NearHotels offers={mockOffers} handleHover={vi.fn()} />);

    const hotelCards = screen.getAllByTestId('hotel-card');
    expect(hotelCards).toHaveLength(2);
    expect(screen.getByText('Near Hotel 1')).toBeInTheDocument();
    expect(screen.getByText('Near Hotel 2')).toBeInTheDocument();
  });
});
