import HotelCard from '../hotel-card/hotel-card';
import HotelsSort from '../hotels-sort/hotels-sort';
import { TOffer } from '../../mocks/offers';
import { useState } from 'react';

type HotelsProps = {
  offers: TOffer[];
}

export default function Hotels({offers}: HotelsProps) {
  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);
  function handleHover(offer?: TOffer) {
    setActiveOffer(offer || null);
  }

  const hotelCards = [];
  for (let i = 0; i < offers.length; i++) {
    hotelCards.push(
      <HotelCard key={i} card={offers[i]} handleHover={handleHover} activeOffer={activeOffer}/>
    );
  }
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{hotelCards.length} places to stay in Amsterdam</b>
      <HotelsSort />
      <div className="cities__places-list places__list tabs__content">
        {hotelCards};
      </div>
    </section>
  );
}
