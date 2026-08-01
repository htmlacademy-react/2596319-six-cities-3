import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { useMap } from './useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { TCity } from '../../mocks/city';
import { TOffer } from '../../mocks/offers';

type HotelsMapProps = {
  city: TCity;
  offers: TOffer[];
  selectedOffer: TOffer | null;
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

export default function HotelsMap({ city, offers, selectedOffer }: HotelsMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);

      offers.forEach((offer) => {
        const latitude = offer.location.latitude;
        const longitude = offer.location.longitude;

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

  return (
    <div className="cities__right-section">
      <section ref={mapRef} className="cities__map map" />
    </div>
  );
}
