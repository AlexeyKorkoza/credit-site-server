import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './configureStore';

// const store = configureStore();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
