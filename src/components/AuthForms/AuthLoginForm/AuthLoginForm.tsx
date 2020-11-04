import React, { useState, Fragment, ChangeEvent, useContext } from 'react';
import { AppContext } from '../../../App';
import { request } from '../../../functions';

export default function AuthLoginForm(): JSX.Element {
  const { login } = useContext(AppContext);
  const [loginInformation, setLoginInformation] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });

  const [errorLogin, setErrorLogin] = useState<{
    visibleErrorMessage: boolean;
    errorMessage: string;
  }>();

  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  function changeHandler(e: ChangeEvent<HTMLInputElement>): void {
    setErrorLogin({ visibleErrorMessage: false, errorMessage: '' });
    const { name, value } = e.target;
    setLoginInformation({ ...loginInformation, [name]: value });
  }

  async function requestOnLogin() {
    setDisabledButton(true);
    request('api/v1/auth/login', 'POST', {}, { ...loginInformation })
      .then((data) => {
        console.log(data);
        login(data.token, data.expiresIn, '');
      })
      .catch((errorPromise) => {
        errorPromise.then(({ message: errorMessage }) => {
          setErrorLogin({ visibleErrorMessage: true, errorMessage });
        });
      })
      .finally(() => setDisabledButton(false));
  }

  return (
    <>
      <div className="control mb-4">
        <label className="label" htmlFor="login">
          Логин
          <input
            id="login"
            name="username"
            type="text"
            className="input is-medium"
            placeholder="Например, example@example.ru"
            onChange={changeHandler}
          />
        </label>
      </div>
      <div className="field">
        <div className="control mb-4">
          <label className="label" htmlFor="password">
            Пароль
            <input
              id="password"
              name="password"
              type="password"
              className="input is-medium"
              placeholder="Например, example"
              onChange={changeHandler}
            />
          </label>
        </div>
        {errorLogin?.visibleErrorMessage && (
          <p className="help is-danger has-text-centered is-size-5">{errorLogin?.errorMessage}</p>
        )}
      </div>
      <button
        className="button is-fullwidth is-primary is-hovered is-active is-medium is-uppercase"
        disabled={disabledButton}
        onClick={requestOnLogin}
      >
        Войти
      </button>
    </>
  );
}
