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
        fullName: '',
        territory: '',
        phone: '',
        login: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };

    componentDidMount() {
        const { role, id } = getDataAuthUser();

        this.setState({ role, id });

        getProfileUser(role, id)
            .then(result => {
                const { data } = result;

                this.setState({ ...data });
            });
    }

    onChangeInput = e => {
        const target = e.target;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    };

    onSave = event => {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            return;
        }

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

    onChangePassword = event => {
        event.preventDefault();

        const {
            role,
            id,
            oldPassword,
            newPassword,
            confirmNewPassword,
        } = this.state;

        if (!oldPassword && !newPassword && !confirmNewPassword) {
            // enter passwords
            return;
        }

        if (newPassword !== confirmNewPassword) {
            // don't equal
            return;
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
