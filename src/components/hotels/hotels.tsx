import HotelCard from '../hotel-card/hotel-card';
import HotelsSort from '../hotels-sort/hotels-sort';
import { TOffer } from '../../mocks/offers';

type HotelsProps = {
  offers: TOffer[];
}

export default function Hotels({offers}: HotelsProps) {
  const hotelCards = offers.map((offer) => (
    <HotelCard
      key={offer.id}
      card={offer}
    />
  ));
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{hotelCards.length} places to stay in Amsterdam</b>
      <HotelsSort />
      <div className="cities__places-list places__list tabs__content">
        {hotelCards}
      </div>
    </section>
  );
}
