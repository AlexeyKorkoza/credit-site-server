import React, { Component } from 'react';
import { withRouter } from 'react-router';

import MenuComponent from '../components/Menu';
import { logOut } from '../api/authentication';
import { getDataAuthUser, logoutUser } from '../services/localDb';

class Menu extends Component {
    state = {
        role: '',
    };

    componentDidMount() {
        const data = getDataAuthUser();
        this.updateUserState(data);
    }

    componentWillReceiveProps() {
        const data = getDataAuthUser();
        this.updateUserState(data);
    }

    onLogout = () => {
        logOut()
            .then(() => {
                logoutUser('key');
                this.props.history.push('/auth');
                this.setState({ role: ''});
            })
    };

    updateUserState(data) {
        if (data) {
            this.setState({
                role: data.role,
            });
        }
    }

    render() {
        const { role } = this.state;

        return (
            <MenuComponent
                onLogOut={this.onLogout}
                role={role}
            />
        );
    }
}

export default withRouter(Menu);
