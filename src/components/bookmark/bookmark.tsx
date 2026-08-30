import { memo, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, changeFavoritedStatusAction, State } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../../const/const';

type BookmarkProps = {
  offerId: string;
  isFavorite: boolean;
  forOfferPage?: boolean;
  onStatusChange?: (isFavorite: boolean) => void;
};

function Bookmark({ offerId, isFavorite, forOfferPage = false, onStatusChange }: BookmarkProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: State) => state.user.authorizationStatus);

  const prefix = forOfferPage ? 'offer' : 'place-card';
  const iconSize = forOfferPage ? { width: 31, height: 33 } : { width: 18, height: 19 };
  const activeClass = isFavorite ? `${prefix}__bookmark-button--active` : '';

  const handleBookmarkClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoritedStatusAction({ offerId, status: isFavorite ? 0 : 1 }))
      .unwrap()
      .then((updatedOffer) => {
        if (onStatusChange) {
          onStatusChange(updatedOffer.isFavorite);
        }
      });
  };

  return (
    <button
      className={`${prefix}__bookmark-button ${activeClass} button`}
      type="button"
      onClick={handleBookmarkClick}
    >
      <svg className={`${prefix}__bookmark-icon`} {...iconSize}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export const MemoizedBookmark = memo(Bookmark);
export default MemoizedBookmark;
