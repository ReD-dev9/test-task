import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { hasToken } from '../functions';

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (hasToken() ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};