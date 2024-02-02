/* eslint-disable import/order */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './redux/filterReducer';
import { ticketReducer } from './redux/ticketReducer';
import { sortReducer } from './redux/sortReducer';

import App from './components/App';

const store = configureStore({
  reducer: {
    filterReducer,
    ticketReducer,
    sortReducer,
  },
});

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
