import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import leaflet from 'leaflet';
import { useMap } from './useMap';
import { TOffer } from '../../const/types';

vi.mock('leaflet', () => {
  const mockMap = {
    setView: vi.fn(),
  };
  const mockTileLayer = {
    addTo: vi.fn(),
  };

  return {
    default: {
      map: vi.fn(() => mockMap),
      tileLayer: vi.fn(() => mockTileLayer),
    },
  };
});

describe('Hook: useMap', () => {
  const mockCity: TOffer['city'] = {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if mapRef.current is null or city is undefined', () => {
    const mapRef = { current: null };

    const { result, rerender } = renderHook(
      ({ ref, city }) => useMap(ref, city),
      {
        initialProps: { ref: mapRef, city: undefined as TOffer['city'] | undefined },
      }
    );

    expect(result.current).toBeNull();

    rerender({ ref: mapRef, city: mockCity });
    expect(result.current).toBeNull();
  });

  it('should initialize Leaflet map when container and city data are provided', () => {
    const element = document.createElement('div');
    const mapRef = { current: element };

    const { result } = renderHook(() => useMap(mapRef, mockCity));

    expect(leaflet.map).toHaveBeenCalledTimes(1);
    expect(leaflet.map).toHaveBeenCalledWith(element, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: mockCity.location.zoom,
    });

    expect(leaflet.tileLayer).toHaveBeenCalledTimes(1);
    expect(result.current).not.toBeNull();
  });

  it('should call setView on city change if map is already initialized', () => {
    const element = document.createElement('div');
    const mapRef = { current: element };

    const newCity: TOffer['city'] = {
      name: 'Amsterdam',
      location: {
        latitude: 52.3702,
        longitude: 4.8951,
        zoom: 12,
      },
    };

    const { rerender } = renderHook(
      ({ city }) => useMap(mapRef, city),
      {
        initialProps: { city: mockCity },
      }
    );

    const mockMapInstance = leaflet.map(element, {});

    rerender({ city: newCity });

    expect(mockMapInstance.setView).toHaveBeenCalledWith(
      [newCity.location.latitude, newCity.location.longitude],
      newCity.location.zoom
    );
  });
});
