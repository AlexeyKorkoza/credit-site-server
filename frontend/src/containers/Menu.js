import React, { Component } from 'react';
import { withRouter } from 'react-router';

import MenuComponent from '../components/Menu';
import { logOut } from '../api/authentication';
import { logoutUser } from '../services/localDb';

class Menu extends Component {
    onLogout = () => {
        logOut()
            .then(() => {
                logoutUser('key');
                this.props.history.push('/auth');
            })
    };

    render() {
        return (
            <MenuComponent
                onLogOut={this.onLogout}
            />
        );
    }
}

export default withRouter(Menu);
