import { TOffer } from '../../mocks/offers';
import NearHotelCard from '../near-hotel-card/near-hotel-card';

type NearHotelsProps = {
  offers: TOffer[];
}

export default function NearHotels({offers}: NearHotelsProps) {
  return offers.map((offer) => <NearHotelCard key={offer.id} card={offer}/>);
}
