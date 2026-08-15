import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { useMap } from './useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const/const';
import { TOffer } from '../../const/types';

type HotelsMapProps = {
  offers: TOffer[];
  selectedOffer: TOffer | null;
  className?: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function HotelsMap({ offers, selectedOffer, className = 'cities__map' }: HotelsMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const city = offers[0]?.city || selectedOffer?.city;
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);
      const pointsToRender = offers;

      pointsToRender.forEach((offer) => {
        const { latitude, longitude } = offer.location;

        if (latitude !== undefined && longitude !== undefined) {
          leaflet
            .marker(
              {
                lat: latitude,
                lng: longitude,
              },
              {
                icon:
                  selectedOffer && offer.id === selectedOffer.id
                    ? currentCustomIcon
                    : defaultCustomIcon,
              },
            )
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <section ref={mapRef} className={`${className} map`} />;
}
