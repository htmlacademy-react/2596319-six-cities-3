import { useState, useMemo } from 'react';
import HotelCard from '../hotel-card/hotel-card';
import HotelsSort from '../hotels-sort/hotels-sort';
import { TOffer } from '../../const/types';

type HotelsProps = {
  offers: TOffer[];
  handleHover: (offer?: TOffer) => void;
  activeCity: string;
};

export default function Hotels({ offers, handleHover, activeCity }: HotelsProps) {
  const [activeSort, setActiveSort] = useState<string>('popular');
  const [sortedOffers, setSortedOffers] = useState<TOffer[]>(offers);
  useMemo(() => {
    const sorted = [...offers];

    switch (activeSort) {
      case 'price-low-to-high':
        sorted.sort((card1, card2) => card1.price - card2.price);
        break;
      case 'price-high-to-low':
        sorted.sort((card1, card2) => card2.price - card1.price);
        break;
      case 'top-rated-first':
        sorted.sort((card1, card2) => card2.rating - card1.rating);
        break;
    }

    setSortedOffers(sorted);
  }, [offers, activeSort]);

  const hotelCards = sortedOffers.map((offer) => (
    <HotelCard
      key={offer.id}
      card={offer}
      handleHover={handleHover}
    />
  ));

  const placesFoundText = `${hotelCards.length} ${hotelCards.length === 1 ? 'place' : 'places'} to stay in ${activeCity}`;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{placesFoundText}</b>
      <HotelsSort activeSort={activeSort} onSortChange={setActiveSort} />
      <div className="cities__places-list places__list tabs__content">
        {hotelCards}
      </div>
    </section>
  );
}
