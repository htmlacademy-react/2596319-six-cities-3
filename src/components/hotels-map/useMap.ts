import leaflet from 'leaflet';
import { useRef, useEffect, useState, MutableRefObject } from 'react';
import { TOffer } from '../../mocks/offers';

export function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: TOffer['city'] | undefined) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!city) {
      return;
    }

    const { latitude, longitude, zoom } = city.location;

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else if (map) {
      map.setView([latitude, longitude], zoom);
    }
  }, [mapRef, city, map]);

  return map;
}
