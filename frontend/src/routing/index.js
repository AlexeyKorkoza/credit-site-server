import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from '../components/App';
import Menu from '../components/Menu';
import { Authentication, Profile } from '../containers';
import { GlobalStyle, Page, Wrapper } from './styles';

const routing = (
    <Router>
        <Wrapper>
            <Menu />
            <Page>
                <GlobalStyle />
                <Route exact path="/" component={App} />
                <Route path="/auth" component={Authentication} />
                <Route path="/profile" component={Profile} />
            </Page>
        </Wrapper>
    </Router>
);

export default routing;
