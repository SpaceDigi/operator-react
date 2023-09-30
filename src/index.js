import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./routers/MainRouter";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "./styles/styles.css";
import { store } from "./redux/store";


ReactDOM.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
