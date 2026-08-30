import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from './logo';
import { AppRoute } from '../../const/const';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(<Logo />);

    const linkElement = screen.getByRole('link');
    const imageElement = screen.getByAltText('6 cities logo');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', AppRoute.Main);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'img/logo.svg');
  });
});
