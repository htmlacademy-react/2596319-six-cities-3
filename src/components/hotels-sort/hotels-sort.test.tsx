import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should toggle options list visibility when clicking on current sort type', async () => {
    render(
      <HotelsSort
        activeSort="popular"
        onSortChange={vi.fn()}
      />
    );

    const sortTypeLabel = screen.getByText('Popular', { selector: '.places__sorting-type' });
    const optionsList = screen.getByRole('list');

    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(sortTypeLabel);
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.click(sortTypeLabel);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should call onSortChange with selected sort type and close list when option is clicked', async () => {
    const handleSortChange = vi.fn();

    render(
      <HotelsSort
        activeSort="popular"
        onSortChange={handleSortChange}
      />
    );

    const sortTypeLabel = screen.getByText('Popular', { selector: '.places__sorting-type' });
    const optionsList = screen.getByRole('list');

    await userEvent.click(sortTypeLabel);
    expect(optionsList).toHaveClass('places__options--opened');

    const options = screen.getAllByRole('listitem');
    const highToLowOption = options.find((option) => option.textContent?.trim() === 'Price: high to low');

    if (highToLowOption) {
      await userEvent.click(highToLowOption);
    }

    expect(handleSortChange).toHaveBeenCalledTimes(1);
    expect(handleSortChange).toHaveBeenCalledWith('price-high-to-low');
    expect(optionsList).not.toHaveClass('places__options--opened');
  });
});
