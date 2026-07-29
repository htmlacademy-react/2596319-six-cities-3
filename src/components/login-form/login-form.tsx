import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [currentLoginFormState, setLoginFormState] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function handleEmailChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const email = evt.target.value;
    setLoginFormState((prevState) => ({
      ...prevState,
      email: email,
    }));
  }

  function handlePasswordChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const password = evt.target.value;
    setLoginFormState((prevState) => ({
      ...prevState,
      password: password,
    }));
  }

  function isValidLogin(): boolean {
    const passwordRegex = /^(?=.*[a-zA-Zа-яА-ЯёЁ])(?=.*\d)/;

    return Boolean(
      currentLoginFormState.email &&
      currentLoginFormState.password &&
      passwordRegex.test(currentLoginFormState.password)
    );
  }

  function handleLinkClick(evt: React.MouseEvent<HTMLAnchorElement>): void {
    evt.preventDefault();
    if (isValidLogin()) {
      navigate('/');
    }
  }

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form">
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required={false}
            value={currentLoginFormState.email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required={false}
            value={currentLoginFormState.password}
            onChange={handlePasswordChange}
          />
        </div>
        <Link
          to="/"
          className="login__submit form__submit button"
          aria-disabled={!isValidLogin()}
          onClick={handleLinkClick}
        >
          Sign in
        </Link>
      </form>
    </section>
  );
}
