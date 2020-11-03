import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {LoginPage} from '../pages';

export default function LoginRouting(): JSX.Element {
  return (
    <>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Redirect to="/login" />
    </>
  );
}
