import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user_info = useSelector((state) => state.user.user_info);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user_info) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};
