import { Link } from 'react-router-dom';
import { TOffer } from '../../const/types';
import Bookmark from '../bookmark/bookmark';
import { memo } from 'react';
import { ReviewConfig } from '../../const/const';

type HotelCardProps = {
  card: TOffer;
  className?: string;
  imageWrapperClassName?: string;
  onHover: (offer?: TOffer) => void;
};

function HotelCard({card,
  className = 'cities__card',
  imageWrapperClassName = 'cities__image-wrapper',
  onHover}: HotelCardProps): JSX.Element {

  const starsCount = `${Math.round(card.rating) * (ReviewConfig.MaxStarsWidthPercentage / ReviewConfig.MaxStarsCount)}%`;
  const offerPath = `/offer/${card.id}`;

  const handleCardMouseOver = () => onHover?.(card);
  const handleCardMouseLeave = () => onHover?.();

  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={handleCardMouseOver}
      onMouseLeave={handleCardMouseLeave}
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
            src={card.previewImage}
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
          <Bookmark offerId={card.id} isFavorite={card.isFavorite} />
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

const HotelCardMemo = memo(HotelCard);
export default HotelCardMemo;
