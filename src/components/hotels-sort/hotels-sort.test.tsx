import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HotelsSort from './hotels-sort';

describe('Component: HotelsSort', () => {
  it('should render correctly with active sort option and active CSS class', () => {
    const handleSortChange = vi.fn();

    render(
      <HotelsSort
        activeSort="price-low-to-high"
        onSortChange={handleSortChange}
      />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();

    const options = screen.getAllByRole('listitem');
    const activeOption = options.find((option) => option.textContent?.trim() === 'Price: low to high');
    const inactiveOption = options.find((option) => option.textContent?.trim() === 'Popular');

    expect(activeOption).toHaveClass('places__option--active');
    expect(inactiveOption).not.toHaveClass('places__option--active');
  });

  it('should render default sort type text for unknown sort type', () => {
    render(
      <HotelsSort
        activeSort="unknown-type"
        onSortChange={vi.fn()}
      />
    );

    const options = screen.getAllByRole('listitem');
    const popularOption = options.find((option) => option.textContent?.trim() === 'Popular');

    expect(popularOption).not.toHaveClass('places__option--active');
    expect(screen.getByText('Popular', { selector: '.places__sorting-type' })).toBeInTheDocument();
  });
});
