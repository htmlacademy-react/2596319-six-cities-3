import HotelCard from '../hotel-card/hotel-card';
import HotelsSort from '../hotels-sort/hotels-sort';

type HotelsProps = {
  cardsCount: number;
}

export default function Hotels({cardsCount}: HotelsProps) {
  const hotelCards = [];
  for (let i = 0; i < cardsCount; i++) {
    hotelCards.push(<HotelCard />);
  }
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{cardsCount} places to stay in Amsterdam</b>
      <HotelsSort />
      <div className="cities__places-list places__list tabs__content">
        {hotelCards};
      </div>
    </section>
  );
}
