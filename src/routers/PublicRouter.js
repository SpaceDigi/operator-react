import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = (props) => {
  const USER_ID = useSelector((state) => state.USER_ID);
  const workplaceId = useSelector((state) => state.workplace.id);
  const serviceCenterId = useSelector((state) => state.serviceCenter.id);
  const orgGuid = useSelector((state) => state.orgGuid);
  if (!USER_ID || !workplaceId || !serviceCenterId || !orgGuid) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/dashboard" />;
  }
};

export default PublicRoute;
