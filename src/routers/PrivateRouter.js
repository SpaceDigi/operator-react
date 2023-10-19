import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const USER_ID = useSelector((state) => state.USER_ID);
  if (Boolean(USER_ID)) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRoute;
