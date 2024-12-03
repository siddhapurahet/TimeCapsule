import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, compose} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import reducers from './reducers';

// const store = configureStore(reducers, compose(applyMiddleware(thunk)))
const store = configureStore({
  reducer: reducers,  // Provide the reducers object or function directly
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

// ReactDOM.createRoot(
//     <Provider store = {store}>
//         <App />
//     </Provider>, 
//     document.getElementById('root'));

// Ensure the target container exists
const container = document.getElementById('root');

// Check if the container is found before rendering
if (container) {
  const root = ReactDOM.createRoot(container); // Correct use of createRoot
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("No root element found in the DOM.");
}