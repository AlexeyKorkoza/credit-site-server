import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from '../components/App';
import Authentication from '../containers/Authentication';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/auth" component={Authentication} />
        </Switch>
    </Router>
);

export default routing;
