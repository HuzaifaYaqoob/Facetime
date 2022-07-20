import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider, useSelector } from "react-redux";
import rootReducer from './redux/rootReducer'

import thunk from "redux-thunk"
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom';
export const store = createStore(rootReducer, applyMiddleware(thunk))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
reportWebVitals();
