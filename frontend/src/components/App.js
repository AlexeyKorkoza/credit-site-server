import React, { Component } from 'react';

import Authentication from '../containers/Authentication';
import { getItem } from '../core/localStorage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthUser: false,
        };
    }

    componentDidMount() {
        this.checkUserCredentials();
    }

    checkUserCredentials() {
        const key = 'user';
        const data = getItem(key, true);

        if (data) {
            this.setState({
                isAuthUser: true,
            });
        }
    }

    render() {
        const { isAuthUser } = this.state;

        console.log('isAuthUser', isAuthUser);
        return (
            <div>
                {
                    !isAuthUser
                    ? <Authentication />
                    : <h1>Hello world</h1>
                }
            </div>
        );
    }
}

export default App;
