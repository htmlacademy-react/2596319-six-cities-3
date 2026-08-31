import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import leaflet from 'leaflet';
import HotelsMap from './hotels-map';
import { useMap } from './useMap';
import { TOffer } from '../../const/types';

vi.mock('./useMap');

const mockMap = { removeLayer: vi.fn() } as unknown as leaflet.Map;

vi.mock('leaflet', () => ({
  default: {
    icon: vi.fn(),
    layerGroup: vi.fn(() => ({ addTo: vi.fn() })),
    marker: vi.fn(() => ({ addTo: vi.fn() })),
  },
}));

describe('HotelsMap', () => {
  const mockOffers = [
    {
      id: '1',
      location: { latitude: 48.85, longitude: 2.35 },
      city: { name: 'Paris', location: { latitude: 48.85, longitude: 2.35, zoom: 10 } },
    },
  ] as unknown as TOffer[];

  it('should render map container element', () => {
    vi.mocked(useMap).mockReturnValue(null);

    const { container } = render(
      <HotelsMap offers={mockOffers} selectedOffer={null} />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('cities__map');
  });

  it('should create markers when map is available', () => {
    vi.mocked(useMap).mockReturnValue(mockMap);

    render(<HotelsMap offers={mockOffers} selectedOffer={null} />);

    expect(leaflet.marker).toHaveBeenCalled();
  });

  it('should remove layer when component unmounts', () => {
    vi.mocked(useMap).mockReturnValue(mockMap);

    const { unmount } = render(
      <HotelsMap offers={mockOffers} selectedOffer={null} />
    );

    unmount();

    expect(mockMap.removeLayer).toHaveBeenCalled();
  });
});
