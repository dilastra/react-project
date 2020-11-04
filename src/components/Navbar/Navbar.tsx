import React, { Fragment, useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AppContext } from '../../App';

export default function Navbar(): JSX.Element {
  document.querySelector('html').classList.add('has-navbar-fixed-top');
  const [stateMenu, setStateMenu] = useState<boolean>(false);
  const history = useHistory();
  const { logout } = useContext(AppContext);

  const logoutHandler = (event: any) => {
    event.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <>
      <nav className="navbar has-shadow is-primary  is-fixed-top" role="navigation">
        <div className="navbar-brand">
          <div className="navbar-item">Logo</div>

          <a
            role="button"
            className={stateMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
            onClick={() => {
              setStateMenu(!stateMenu);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={stateMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-end">
            <NavLink to="/applications" className="navbar-item">
              Заявки
            </NavLink>
            <NavLink to="/products" className="navbar-item">
              Продукты
            </NavLink>

            <NavLink to="/profile" className="navbar-item">
              Профиль
            </NavLink>

            <a href="/logout" onClick={logoutHandler} className="navbar-item">
              Выйти
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
