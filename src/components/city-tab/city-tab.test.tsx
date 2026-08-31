import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CityTab from './city-tab';

describe('Component: CityTab', () => {
  it('should render correctly with active class when cityName equals activeCity', () => {
    const cityName = 'Paris';
    const activeCity = 'Paris';
    const handleCityTabClick = vi.fn();

    render(
      <CityTab
        cityName={cityName}
        activeCity={activeCity}
        onCityTabClick={handleCityTabClick}
      />
    );

    const linkElement = screen.getByRole('link', { name: 'Paris' });

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(linkElement).toHaveClass('tabs__item--active');
  });

  it('should render correctly without active class when cityName does not equal activeCity', () => {
    const cityName = 'Cologne';
    const activeCity = 'Paris';
    const handleCityTabClick = vi.fn();

    render(
      <CityTab
        cityName={cityName}
        activeCity={activeCity}
        onCityTabClick={handleCityTabClick}
      />
    );

    const linkElement = screen.getByRole('link', { name: 'Cologne' });

    expect(linkElement).not.toHaveClass('tabs__item--active');
  });

  it('should call onCityTabClick with correct cityName when clicked', async () => {
    const cityName = 'Amsterdam';
    const activeCity = 'Paris';
    const handleCityTabClick = vi.fn();

    render(
      <CityTab
        cityName={cityName}
        activeCity={activeCity}
        onCityTabClick={handleCityTabClick}
      />
    );

    const linkElement = screen.getByRole('link', { name: cityName });
    await userEvent.click(linkElement);

    expect(handleCityTabClick).toHaveBeenCalledTimes(1);
    expect(handleCityTabClick).toHaveBeenCalledWith(cityName);
  });
});
