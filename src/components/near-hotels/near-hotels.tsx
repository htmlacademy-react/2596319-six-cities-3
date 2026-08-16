import { TOffer } from '../../const/types';
import HotelCard from '../hotel-card/hotel-card';

type NearHotelsProps = {
  offers: TOffer[];
  handleHover: (offer?: TOffer) => void;
};

export default function NearHotels({ offers, handleHover }: NearHotelsProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <HotelCard
          key={offer.id}
          card={offer}
          handleHover={handleHover}
          className="near-places__card"
          imageWrapperClassName="near-places__image-wrapper"
        />
      ))}
    </div>
  );
}
