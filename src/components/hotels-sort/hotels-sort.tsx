import { useRef } from 'react';

type HotelsSortProps = {
  activeSort: string;
  onSortChange: (sortType: string) => void;
};

export default function HotelsSort({ activeSort, onSortChange }: HotelsSortProps) {
  const sortOptionsRef = useRef<HTMLUListElement>(null);

  function handleToggleOptions() {
    sortOptionsRef.current?.classList.toggle('places__options--opened');
  }

  function handleSortSelect(sortType: string) {
    onSortChange(sortType);
    sortOptionsRef.current?.classList.remove('places__options--opened');
  }

  function getCurrentSortType() {
    switch (activeSort) {
      case 'popular':
        return 'Popular';
      case 'price-low-to-high':
        return 'Price: low to high';
      case 'price-high-to-low':
        return 'Price: high to low';
      case 'top-rated-first':
        return 'Top rated first';
      default:
        return 'Popular';
    }
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleOptions}
      >
        {getCurrentSortType()}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className="places__options places__options--custom" ref={sortOptionsRef}>
        <li
          className={`places__option ${activeSort === 'popular' ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortSelect('popular')}
        >
          Popular
        </li>
        <li
          className={`places__option ${activeSort === 'price-low-to-high' ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortSelect('price-low-to-high')}
        >
          Price: low to high
        </li>
        <li
          className={`places__option ${activeSort === 'price-high-to-low' ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortSelect('price-high-to-low')}
        >
          Price: high to low
        </li>
        <li
          className={`places__option ${activeSort === 'top-rated-first' ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortSelect('top-rated-first')}
        >
          Top rated first
        </li>
      </ul>
    </form>
  );
}
