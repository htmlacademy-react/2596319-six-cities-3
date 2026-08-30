import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CitiesTabs from './cities-tabs';

vi.mock('../../const/const', () => ({
  CITIES: ['Paris', 'Cologne', 'Brussels'],
}));

describe('Component: CitiesTabs', () => {
  it('should render correctly with all city tabs', () => {
    const activeCity = 'Paris';
    const handleCityClick = vi.fn();

    render(
      <CitiesTabs
        activeCity={activeCity}
        onCityClick={handleCityClick}
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: /cities/i })).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });
});
