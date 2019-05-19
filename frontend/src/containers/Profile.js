import React, { Component } from 'react';

import { Admin, Manager } from '../components/Profile';
import { getDataAuthUser } from '../services/localDb';
import {
    getProfileUser,
    updateProfileUser,
    updatePasswordsProfileUser,
} from '../api/profile';

const rolesComponents = {
    'admin': Admin,
    'manager': Manager,
};

export default class Profile extends Component {
    state = {
        role: '',
    };

    componentDidMount() {
        const { role, id } = getDataAuthUser();

        this.setState({ role, id });

        getProfileUser(role, id)
            .then(result => {
                this.setState({ ...result });
            });
    }

    onChangeInput = e => {
        const target = e.target;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    };

    onSave = () => {
        const { role, id, login } = this.state;

        let body = {
            login,
        };
        if (role === 'manager') {
            const {
                fullName,
                territory,
                phone,
                email
            } = this.state;
            body = Object.assign({}, body, {
                fullName,
                territory,
                phone,
                email
            });
        }

        return updateProfileUser(role, id, body);
    };

    onChangePassword = () => {
        const {
            role,
            id,
            oldPassword,
            newPassword,
            confirmNewPassword,
        } = this.state;

        if (!oldPassword && !newPassword && !confirmNewPassword) {
            // enter passwords
        }

        if (newPassword !== confirmNewPassword) {
            // don't equal
        }

        const body = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        };

        return updatePasswordsProfileUser(role, id, body);
    };

    onChangeTerritory = () => {

    };

    render() {
        const { role } = this.state;

        if (!role) {
            return null;
        }

        const Component = rolesComponents[role];

        return (
          <Component
            onSave={this.onSave}
            onChangePassword={this.onChangePassword}
            onChangeTerritory={this.onChangeTerritory}
            onChangeInput={this.onChangeInput}
            data={this.state}
          />
        );
    }
}
