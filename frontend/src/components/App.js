import React, { Component } from 'react';
import { withRouter, Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { getDataAuthUser } from '../services/localDb';
import { GlobalStyle, Page, Wrapper } from "../routing/styles";
import { Authentication, Clients, Loans, Managers, Menu, Profile } from "../containers";
import { PrivateRouter, PrivateRouterRole } from "../routing/private";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthUser: true,
        };
    }

    componentDidMount() {
        const data = getDataAuthUser();

        if (!data) {
            this.updateUserState(false);
        }
    }

    updateUserState(isAuthUser) {
        this.setState({
            isAuthUser,
        });
    }

    render() {
        const { isAuthUser } = this.state;

        if (isAuthUser) {
            return (
                    <Wrapper>
                        <Menu />
                        <Page>
                            <GlobalStyle />
                            <Switch>
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
                                <PrivateRouter exact path="/clients" component={Clients.List} />
                                <PrivateRouterRole
                                    accessRole='manager'
                                    exact
                                    path="/clients/add"
                                    component={Clients.Editor}
                                />
                                <PrivateRouter exact path="/clients/:id" component={Clients.Editor} />
                                <PrivateRouterRole
                                    accessRole='admin'
                                    exact
                                    path="/loans"
                                    component={Loans.List}
                                />
                                <PrivateRouterRole
                                    accessRole='manager'
                                    exact
                                    path="/loans/add"
                                    component={Loans.Add}
                                />
                                <PrivateRouterRole
                                    accessRole='admin'
                                    exact
                                    path="/loans/:id"
                                    component={Loans.Editor}
                                />
                            </Switch>
                        </Page>
                    </Wrapper>
            );
        }

        return (
            <div>
                <Wrapper>
                    <Page>
                        <Authentication />
                    </Page>
                </Wrapper>
            </div>
        )
    }
}

export default App;
