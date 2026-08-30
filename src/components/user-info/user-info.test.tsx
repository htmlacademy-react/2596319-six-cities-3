import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import UserInfo from './user-info';
import { AuthorizationStatus } from '../../const/const';
import { TUserData } from '../../const/types';

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

const mockUserData: TUserData = {
  name: 'username',
  avatarUrl: 'img/avatar.jpg',
  isPro: false,
  email: 'mock@hello.co',
  token: 'secret-token',
};

describe('Component: UserInfo', () => {
  it('should render user email, favorites count, and "Sign out" button when authorized', () => {
    render(
      <MemoryRouter>
        <UserInfo
          authorizationStatus={AuthorizationStatus.Auth}
          userData={mockUserData}
          favoritesCount={3}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('mock@hello.co')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should render Sign in link when not authorized', () => {
    render(
      <MemoryRouter>
        <UserInfo
          authorizationStatus={AuthorizationStatus.NoAuth}
          userData={null}
          favoritesCount={0}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('mock@hello.co')).not.toBeInTheDocument();
  });
});
