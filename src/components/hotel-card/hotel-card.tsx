import { Link } from 'react-router-dom';
import { TOffer } from '../../mocks/offers';
import Bookmark from '../bookmark/bookmark';

type HotelCardProps = {
  card: TOffer;
  handleHover: (offer?: TOffer) => void;
  activeOffer: TOffer | null;
}

export default function HotelCard({card, handleHover, activeOffer}: HotelCardProps): JSX.Element {
  const starsCount = `${card.rating * 20}%`;

  function handleMouseOver() {
    handleHover(card);
  }

  function handleMouseLeave() {
    handleHover();
  }

  const offerPath = `/offer/${activeOffer?.id ?? card.id}`;

  return (
    <Link to={offerPath}>
      <article className="cities__card place-card"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {card.isPremium && <div className="place-card__mark"><span>Premium</span></div>}

        <div className="cities__image-wrapper place-card__image-wrapper">
          <img
            className="place-card__image"
            src={card.images[0]}
            width={260}
            height={200}
            alt="Place image"
          />
        </div>

        <div className="place-card__info">
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
              <span style={{ width: starsCount }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {card.title}
          </h2>
          <p className="place-card__type">{card.type}</p>
        </div>
      </article>
    </Link>
  );
}
