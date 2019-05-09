import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Menu from './Menu';

import { getDataAuthUser } from '../services/localDb';

const Page = styled.div`
  display: flex;
  background: #6B5B95;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

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

        if (!isAuthUser) {
            return <Redirect to={'/auth'} />;
        }

        const { role } = getDataAuthUser();

        return (
            <Page>
                <Menu
                  role={role}
                />
                <GlobalStyle />
            </Page>
        );
    }
}

export default App;
