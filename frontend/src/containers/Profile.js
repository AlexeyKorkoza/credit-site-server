import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

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
    validatorProfile = new SimpleReactValidator();

    state = {
        role: '',
        fullName: '',
        phone: '',
        login: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        territories: [
            {
                label: '0.5 %',
                value: '0.5',
            },
            {
                label: '1 %',
                value: '1',
            },
            {
                label: '1.5 %',
                value: '1.5',
            },
        ],
        selectedTerritory: {},
        isEqualNewPasswords: true,
        isEmptyPasswordsFields: false,
    };

    componentDidMount() {
        const { role, id } = getDataAuthUser();

        this.setState({ role, id });

        getProfileUser(role, id)
            .then(result => {
                const { data } = result;
                if (data.territory) {
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === data.territory);
                    this.setState({ ...data, selectedTerritory });
                } else {
                    this.setState({ ...data });
                }
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

        if (!this.validatorProfile.allValid()) {
            return;
        }

        const { role, id, login } = this.state;

        let body = {
            login,
        };
        if (role === 'manager') {
            const {
                fullName,
                phone,
                email,
                selectedTerritory,
            } = this.state;
            const { value: territory } = selectedTerritory;
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

        this.setState({
            isEqualNewPasswords: true,
            isEmptyPasswordsFields: false,
        });

        const {
            role,
            id,
            oldPassword,
            newPassword,
            confirmNewPassword,
        } = this.state;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            this.setState({ isEmptyPasswordsFields: true });

            return;
        }

        if (newPassword !== confirmNewPassword) {
            this.setState({ isEqualNewPasswords: false });

            return;
        }

        const body = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        };

        return updatePasswordsProfileUser(role, id, body);
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
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
            validatorProfile={this.validatorProfile}
          />
        );
    }
}
