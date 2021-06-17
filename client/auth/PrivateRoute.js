import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./AuthHelper";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location.state },
            search:
              `?redirect=${props.location.pathname}` +
              (props.location.search
                ? `&search=true&${props.location.search}`
                : ""),
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
