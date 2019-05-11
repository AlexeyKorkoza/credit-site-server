import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { getDataAuthUser } from '../services/localDb';

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

        return (
            <Redirect to={'/profile'} />
        );
    }
}

export default App;
