import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { hasToken } from '../functions';


export const PrivateRoute = ({ component: Component,  layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (hasToken()) {
            return (
                <Route {...rest} render={ props => (
                        <Layout {...props}>
                            <Component {...props} />
                        </Layout>
                    )
                }
            />
        )
      } else {
        return <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      };
    }}
  />
);