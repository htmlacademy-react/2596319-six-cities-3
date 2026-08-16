import { TReview } from '../../const/types';
import Review from '../review/review';

type ReviewsContainerProps = {
  reviews: TReview[];
};

export default function ReviewsContainer({reviews}: ReviewsContainerProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={reviews.indexOf(review)} review={review}/>)}
      </ul>
    </>
  );
}
