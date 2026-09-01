import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from './logo';
import { AppRoute } from '../../const/const';

describe('Component: Logo', () => {
  it('should render correctly in inactive state', () => {
    render(<Logo isActive={false} />);

    const linkElement = screen.getByRole('link');
    const imageElement = screen.getByAltText('6 cities logo');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', AppRoute.Main);
    expect(linkElement).toHaveClass('header__logo-link');
    expect(linkElement).not.toHaveClass('header__logo-link--active');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'img/logo.svg');
    expect(imageElement).toHaveAttribute('width', '81');
    expect(imageElement).toHaveAttribute('height', '41');
  });

  it('should add active class when isActive prop is true', () => {
    render(<Logo isActive />);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveClass('header__logo-link', 'header__logo-link--active');
  });
});
