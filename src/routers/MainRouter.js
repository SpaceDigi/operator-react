import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../styles/styles.css";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import ChooseData from "../Pages/ChooseData";
import CreateClient from "../Pages/CreateClient";
import Error from "../Pages/Error";

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/error" component={Error} />
      <PrivateRouter path="/dashboard" component={Dashboard} />
      <PrivateRouter path="/choose-data" component={ChooseData} />
      <PrivateRouter path="/create-client" component={CreateClient} />
    </Switch>
  </BrowserRouter>
);
export default MainRouter;
