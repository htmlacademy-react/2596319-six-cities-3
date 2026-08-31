import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render 404 header and link to main page correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: '404' })).toBeInTheDocument();

    const linkElement = screen.getByRole('link', {
      name: /Нажмите сюда для возвращения на главную страницу/i,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
