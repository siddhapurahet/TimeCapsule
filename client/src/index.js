import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, compose} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import reducers from './reducers';

const store = configureStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.createRoot(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.getElementById('root'));