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
    <div>
      {favoriteCities.map((cityName) => {
        const offersInCity = favoritedOffers.filter((offer) => offer.city.name === cityName);
        const hotelCardsToRender = [];
        for (let i = 0; i < offersInCity.length; i++) {
          hotelCardsToRender.push(<FavoritedHotelCard key={i} card={offersInCity[i]}/>);
        }

        return (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {hotelCardsToRender}
            </div>
          </li>
        );
      })}
    </div>
  );
}
