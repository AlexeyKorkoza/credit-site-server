import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { GlobalStyle, Page, Wrapper } from "../routing/styles";
import { Authentication, Clients, Loans, Managers, Profile } from "../containers";
import { PrivateRouter, PrivateRouterRole } from "../routing";
import { currentUserSubject, logOut } from '../api/authentication';
import MenuComponent from "./Menu";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
        };
    }

    componentDidMount() {
        currentUserSubject.subscribe(result => {
            if (!result) {
                this.setState({ role: '' });

                return;
            }

            const { role } = result;
            this.setState({ role });
        });
    }

    onLogOut = () => {
        logOut()
            .then(() => this.props.history.push('/auth'));
    };

    render() {
        const { role } = this.state;

        return (
            <Wrapper>
                {role && <MenuComponent
                    onLogOut={this.onLogOut}
                    role={role}
                />
                }
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
}

export default withRouter(App);
