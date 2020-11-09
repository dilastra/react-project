import React, { Fragment, useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AppContext } from '../../App';
import { arrNavLink } from './arrNavLink';

export default function Navbar(): JSX.Element {
  document.querySelector('html').classList.add('has-navbar-fixed-top');
  const [stateMenu, setStateMenu] = useState<boolean>(false);
  const history = useHistory();
  const { logout } = useContext(AppContext);

  function onClick() {
    setStateMenu(false);
  }

  function logoutHandler(event: any) {
    event.preventDefault();
    logout();
  }

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
            {arrNavLink.map(({ key, name, path }: { key: number; name: string; path: string }) => {
              return (
                <NavLink key={key} to={path} className="navbar-item" onClick={onClick}>
                  {name}
                </NavLink>
              );
            })}

            <NavLink to="/login" onClick={logoutHandler} className="navbar-item">
              Выйти
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
