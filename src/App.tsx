import React, { createContext, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Loader, Navbar } from './components';
import { useAuth } from './hooks';
import { AppRouting, LoginRouting } from './routing';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext({
  token: '',
  login(_token: string, _expiresIn: number, _deadToken: string) {},
  logout() {},
});

export function App(): JSX.Element {
  const { token, login, logout, ready } = useAuth();

  if (!token.length && ready) {
    return (
      <AppContext.Provider value={{ token, login, logout }}>
        <LoginRouting />
      </AppContext.Provider>
    );
  } else if (token.length && ready) {
    return (
      <>
        <AppContext.Provider value={{ token, login, logout }}>
          <Navbar />
          <div className="container is-fullhd">
            <AppRouting />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </AppContext.Provider>
      </>
    );
  } else {
    return <Loader />;
  }
}
