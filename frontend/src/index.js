import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';

import routing from './routing';
import configureStore from './configureStore';

// const store = configureStore();

ReactDOM.render(
  routing,
  document.getElementById('root')
);
