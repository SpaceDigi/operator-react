import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './routers/MainRouter';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import './styles/styles.css';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
