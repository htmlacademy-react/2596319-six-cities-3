import { memo } from 'react';
import { TReview } from '../../const/types';
import Review from '../review/review';

type ReviewsContainerProps = {
  reviews: TReview[];
};

function ReviewsContainer({ reviews }: ReviewsContainerProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

const memorizeedReviewsContainer = memo(ReviewsContainer);

export default memorizeedReviewsContainer;
