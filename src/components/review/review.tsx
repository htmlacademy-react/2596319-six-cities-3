import { memo } from 'react';
import { TReview } from '../../const/types';

type ReviewProps = {
  review: TReview;
}

function Review({review}: ReviewProps) {
  const rating = `${review.rating * 20}%`;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: rating }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={review.date.split('T')[0]}
        >
          {new Date(review.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
}

const memorizedReview = memo(Review);
export default memorizedReview;
