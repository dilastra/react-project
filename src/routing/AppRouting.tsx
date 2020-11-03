import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ApplicationInfoPage, ApplicationsPage, FormPage, ProductsPage, ProfilePage} from '../pages/index';

export default function AppRouting(): JSX.Element {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/applications" />
      </Route>
      <Route exact path="/login">
        <Redirect to="/applications" />
      </Route>
      <Route exact path="/applications">
        <ApplicationsPage />
      </Route>
      <Route path="/applications/:id">
        <ApplicationInfoPage />
      </Route>
      <Route path="/application/edit-form/:id">
        <FormPage step={'current-step'} />
      </Route>
      <Route exact path="/products">
        <ProductsPage />
      </Route>
      <Route exact path="/products/create-form/:id">
        <FormPage step={'first-step'} />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
    </>
  );
}
