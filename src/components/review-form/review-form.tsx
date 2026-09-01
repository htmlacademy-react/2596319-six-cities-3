import { useState, FormEvent, Fragment, memo } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../const/const';
import { AppDispatch, postCommentAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { TReview } from '../../const/types';

type ReviewFormProps = {
  offerId: string;
  onCommentSubmit: (newReview: TReview) => void;
};

function ReviewForm({ offerId, onCommentSubmit }: ReviewFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [currentReviewState, setReviewState] = useState({ rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleRatingChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const value = Number(evt.target.value);
    setReviewState((prevState) => ({
      ...prevState,
      rating: value,
    }));
  }

  function handleCommentChange(evt: React.ChangeEvent<HTMLTextAreaElement>): void {
    const value = evt.target.value;
    setReviewState((prevState) => ({
      ...prevState,
      comment: value,
    }));
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    setIsSubmitting(true);

    dispatch(
      postCommentAction({
        offerId,
        comment: currentReviewState.comment,
        rating: currentReviewState.rating,
      })
    )
      .unwrap()
      .then((newReview) => {
        onCommentSubmit(newReview);
        setReviewState({ rating: 0, comment: '' });
      })
      .catch(() => {
        setIsSubmitting(false);
        // eslint-disable-next-line no-alert
        alert('Произошла ошибка. Попробуйте снова');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const isSubmitDisabled: boolean =
    isSubmitting ||
    currentReviewState.rating === 0 ||
    currentReviewState.comment.length < MIN_COMMENT_LENGTH ||
    currentReviewState.comment.length > MAX_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[
          { value: 5, title: 'perfect' },
          { value: 4, title: 'good' },
          { value: 3, title: 'not bad' },
          { value: 2, title: 'badly' },
          { value: 1, title: 'terribly' },
        ].map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={currentReviewState.rating === value}
              disabled={isSubmitting}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={currentReviewState.comment}
        disabled={isSubmitting}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

const MemorizedReviewForm = memo(ReviewForm);
export default MemorizedReviewForm;
