import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { PrivateRouter, PrivateRouterRole } from './private';
import App from '../components/App';
import {
    Authentication,
    Managers,
    Menu,
    Profile,
} from '../containers';
import { GlobalStyle, Page, Wrapper } from './styles';

const routing = (
  <Router>
    <Wrapper>
      <Menu />
      <Page>
        <GlobalStyle />
        <Switch>
          <Route path="/auth" component={Authentication} />
          <PrivateRouter exact path="/" component={App} />
          <PrivateRouter exact path="/profile" component={Profile} />
          <PrivateRouterRole
            accessRole="admin"
            exact
            path="/managers"
            component={Managers.List}
          />
          <PrivateRouterRole
            accessRole="admin"
            exact
            path="/managers/add"
            component={Managers.Editor}
          />
          <PrivateRouterRole
            accessRole="admin"
            exact
            path="/managers/:id"
            component={Managers.Editor}
          />
        </Switch>
      </Page>
    </Wrapper>
  </Router>
);

export default routing;
