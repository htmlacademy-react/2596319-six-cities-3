import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyMainPage from './empty-main-page';
import { AuthorizationStatus } from '../../const/const';
import { withStoreAndHistory } from '../../mocks';

describe('Component: EmptyMainPage', () => {
  it('should render correctly with given props', () => {
    const activeCity = 'Paris';
    const handleCityClick = vi.fn();

    const { withStoreComponent } = withStoreAndHistory(
      <EmptyMainPage
        authorizationStatus={AuthorizationStatus.NoAuth}
        userData={null}
        favoritesCount={0}
        activeCity={activeCity}
        onCityClick={handleCityClick}
      />
    );

    render(withStoreComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`We could not find any property available at the moment in *${activeCity}`, 'i'))
    ).toBeInTheDocument();
  });
});
