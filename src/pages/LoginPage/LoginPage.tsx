import React, { useState } from 'react';
import { AuthCryptoForm, AuthLoginForm } from '../../components';
import './LoginPage.scss';

export default function LoginPage(): JSX.Element {
  document.querySelector('html').classList.remove('has-navbar-fixed-top');
  const [stateTabs, setStateTabs] = useState<string>('login');
  const tabs = [
    { id: 0, typeTab: 'login', nameTab: 'по логину' },
    { id: 1, typeTab: 'cryptoLogin', nameTab: 'по эцп' },
  ];

  function handleClick(typeTabs: string): void {
    setStateTabs(typeTabs);
  }
  return (
    <div className="container login-page login-page__background-image is-fluid is-justify-content-center is-align-items-center is-flex">
      <div className="box login-panel__panel-container">
        <h1 className="title has-text-centered is-uppercase">Авторизация</h1>
        <div className="tabs is-centered is-fullwidth">
          <ul>
            {tabs.map(
              ({ id, typeTab, nameTab }: { id: number; typeTab: string; nameTab: string }) => {
                return (
                  <li key={id} className={stateTabs === typeTab ? 'is-active' : ''}>
                    <a onClick={(_) => handleClick(typeTab)} className="is-uppercase">
                      {nameTab}
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <div className="login-panel__auth-form">
          {stateTabs === 'login' ? <AuthLoginForm /> : <AuthCryptoForm />}
        </div>
      </div>
    </div>
  );
}
