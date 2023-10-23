import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const USER_ID = useSelector((state) => state.USER_ID);
  const workplaceId = useSelector((state) => state.workplaceId);
  const serviceCenterId = useSelector((state) => state.serviceCenterId);
  if (USER_ID && workplaceId && serviceCenterId) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default PrivateRoute;
