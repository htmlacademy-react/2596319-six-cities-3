
type BookmarkProps = {
  isChecked: boolean;
}

export default function Bookmark({isChecked}: BookmarkProps) {
  return isChecked ?
    <button
      className="place-card__bookmark-button place-card__bookmark-button--active button"
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={18} height={19}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
    :
    <button className="place-card__bookmark-button button" type="button">
      <svg className="place-card__bookmark-icon" width={18} height={19}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>;
}
