import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user_info = useSelector((state) => state.user.user_info);
  console.log("divij - ", rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user_info) {
          if (
            rest.location.pathname === "/admin-dashboard" &&
            user_info.roles === "admin"
          ) {
            return <Component {...props} />;
          } else if (
            rest.location.pathname === "/admin-dashboard" &&
            user_info.roles === "user"
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/dashboard",
                  state: { from: props.location },
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
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
