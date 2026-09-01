import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ErrorComponent from './error-component';

describe('Component: ErrorComponent', () => {
  it('should render correctly with title and main page link', () => {
    render(
      <MemoryRouter>
        <ErrorComponent />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Сервер временно недоступен/i,
    });
    const link = screen.getByRole('link', {
      name: /Нажмите сюда для возвращения на главную страницу/i,
    });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
