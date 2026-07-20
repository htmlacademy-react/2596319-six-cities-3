import { Link } from 'react-router-dom';

export default function LoginForm() {
  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post">
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required={false}
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
          />
        </div>
        <Link to='/'>
          <button className="login__submit form__submit button" type="submit">
            Sign in
          </button>
        </Link>
      </form>
    </section>
  );
}
