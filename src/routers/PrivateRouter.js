import React from "react";
import { Route, Redirect } from "react-router-dom";
import Keys from "../Constants/helper";

const PrivateRoute = (props) => {
  const userToken = localStorage.getItem(Keys.JWT_TOKEN);
  if (userToken !== null) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRoute;
