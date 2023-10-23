import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../styles/styles.css';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import PrivateRouter from './PrivateRouter';
import ChooseData from '../Pages/ChooseData';
import CreateClient from '../Pages/CreateClient';
import Error from '../Pages/Error';
import { routes } from '../api/routes';
import PublicRoute from './PublicRouter';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.error} component={Error} />
      <Route path={routes.chooseData} component={ChooseData} />
      <PublicRoute exact path={routes.login} component={Login} />
      <PrivateRouter path={routes.dashboard} component={Dashboard} />
      <PrivateRouter path={routes.createClient} component={CreateClient} />
    </Switch>
  </BrowserRouter>
);
export default MainRouter;
