import { Link } from 'react-router-dom';
import { TOffer } from '../../mocks/offers';
import FavoritedHotelCard from '../favorited-hotel-card/favorited-hotel-card';

type TFavoritedHotelProps = {
  offers: TOffer[];
}

export default function FavoritedHotels({offers}: TFavoritedHotelProps) {
  const favoritedOffers = offers.filter((offer) => offer.isFavorite);

  const favoriteCities = Array.from(
    new Set(favoritedOffers.map((offer) => offer.city.name))
  );

  return (
    <>
      {favoriteCities.map((cityName) => {
        const offersInCity = favoritedOffers.filter((offer) => offer.city.name === cityName);
        const hotelCardsToRender = offersInCity.map((offer) => <FavoritedHotelCard key={offer.id} card={offer}/>);

        return (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link to='/'>
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {hotelCardsToRender}
            </div>
          </li>
        );
      })}
    </>
  );
}
