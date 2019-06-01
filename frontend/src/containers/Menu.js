import React, { Component } from 'react';

import MenuComponent from '../components/Menu';
import { logOut } from '../api/authentication';

class Menu extends Component {
    onLogout = () => {
        logOut()
            .then(() => {
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

export default Menu;
