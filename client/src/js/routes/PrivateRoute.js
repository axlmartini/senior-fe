import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!isAuthenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

export default PrivateRoute