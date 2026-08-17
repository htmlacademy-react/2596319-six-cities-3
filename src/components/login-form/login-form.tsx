import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, loginAction } from '../../store/api-actions';
import { AppRoute } from '../../const/const';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const [currentLoginFormState, setLoginFormState] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function handleEmailChange(evt: ChangeEvent<HTMLInputElement>): void {
    setLoginFormState((prevState) => ({
      ...prevState,
      email: evt.target.value,
    }));
  }

  function handlePasswordChange(evt: ChangeEvent<HTMLInputElement>): void {
    setLoginFormState((prevState) => ({
      ...prevState,
      password: evt.target.value,
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

  function handleSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    if (isValidLogin()) {
      dispatch(loginAction(currentLoginFormState))
        .unwrap()
        .then(() => {
          navigate(AppRoute.Main);
        });
    }
  }

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" onSubmit={handleSubmit}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
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
            required
            value={currentLoginFormState.password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={!isValidLogin()}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
