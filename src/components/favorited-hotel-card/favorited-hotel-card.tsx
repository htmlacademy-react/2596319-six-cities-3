import { TOffer } from '../../mocks/offers';
import Bookmark from '../bookmark/bookmark';
import { Link } from 'react-router-dom';

type TFavoritedHotelCard = {
  card: TOffer;
}

export default function FavoritedHotelCard({card}: TFavoritedHotelCard) {
  const offerPath = `/offer/${card.id}`;

  return (
    <Link to={offerPath}>
      <article className="favorites__card place-card">
        {card.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <img
            className="place-card__image"
            src={card.images[0]}
            width={150}
            height={110}
            alt="Place image"
          />
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{card.price}</b>
              <span className="place-card__price-text">
                /&nbsp;night
              </span>
            </div>
            <Bookmark isChecked={card.isFavorite}/>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: '100%' }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            Nice, cozy, warm big bed apartment
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    </Link>
  );
}
