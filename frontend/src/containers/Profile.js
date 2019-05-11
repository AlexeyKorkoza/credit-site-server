import React, { Component } from 'react';

import { Admin, Manager } from '../components/Profile';
import { getDataAuthUser } from '../services/localDb';

const roles = {
    'admin': Admin,
    'manager': Manager,
};

export default class Profile extends Component {
    state = {
        role: '',
    };

    componentDidMount() {
        const { role } = getDataAuthUser();

        this.setState({ role });
    }

    render() {
        const { role } = this.state;

        if (!role) {
            return null;
        }

        console.log('this.state', this.state);
        const Component = roles[role];

        return (
            <Component />
        );
    }
}
