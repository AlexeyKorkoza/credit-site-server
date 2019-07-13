import 'react-dates/initialize';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import configureStore from './configureStore';

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
};

// const store = configureStore();

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <Router>
            <App />
        </Router>
    </AlertProvider>
);

render(<Root />, document.getElementById('root'));
