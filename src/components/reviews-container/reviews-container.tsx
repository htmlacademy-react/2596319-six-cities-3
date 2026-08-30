import { memo } from 'react';
import { TReview } from '../../const/types';
import Review from '../review/review';
import { MAX_REVIEWS_COUNT } from '../../const/const';

type ReviewsContainerProps = {
  reviews: TReview[];
};

function ReviewsContainer({ reviews }: ReviewsContainerProps) {
  const reviewsToRender = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

const MemorizedReviewsContainer = memo(ReviewsContainer);

export default MemorizedReviewsContainer;
