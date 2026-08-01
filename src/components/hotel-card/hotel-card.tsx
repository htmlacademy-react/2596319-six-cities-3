import { Link } from 'react-router-dom';
import { TOffer } from '../../mocks/offers';
import Bookmark from '../bookmark/bookmark';

type HotelCardProps = {
  card: TOffer;
  className?: string;
  imageWrapperClassName?: string;
  handleHover: (offer?: TOffer) => void;
};

export default function HotelCard({card,
  className = 'cities__card',
  imageWrapperClassName = 'cities__image-wrapper',
  handleHover}: HotelCardProps): JSX.Element {

  const starsCount = `${card.rating * 20}%`;
  const offerPath = `/offer/${card.id}`;

  const handleMouseOver = () => handleHover?.(card);
  const handleMouseLeave = () => handleHover?.();

  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={offerPath}>
          <img
            className="place-card__image"
            src={card.images[0]}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{card.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark isChecked={card.isFavorite} />
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: starsCount }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={offerPath}>{card.title}</Link>
        </h2>

        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}
