import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk }  from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import './index.css';

// const store = configureStore(reducers, compose(applyMiddleware(thunk)));
const store = configureStore({
  reducer: reducers, // Pass the reducers object directly
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);