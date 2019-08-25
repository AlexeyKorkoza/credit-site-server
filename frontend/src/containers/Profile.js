import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';

import { Admin, Manager } from '../components/Profile';
import { getDataAuthUser } from '../services/localDb';
import {
    getProfileUser,
    updateProfileUser,
    updatePasswordsProfileUser,
} from '../api/profile';
import buildNotification from '../services/notification';
import Validator from "../shared/Validator";

const rolesComponents = {
    'admin': Admin,
    'manager': Manager,
};

export default class Profile extends Component {
    validatorProfile = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });
    notificationDOMRef = React.createRef();

    state = {
        role: '',
        fullName: '',
        phone: '',
        login: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        successfulNotification: 'SuccessfulChangingPassword',
        failureNotification: 'FailureChangingPassword',
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

        const {
            role,
            id,
            oldPassword,
            newPassword,
            successfulNotification,
            failureNotification,
            confirmNewPassword,
        } = this.state;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            const notification = buildNotification('Please, enter fill in all fields', failureNotification);
            this.notificationDOMRef.current.addNotification(notification);

            return;
        }

        if (oldPassword.length < 8 || newPassword.length < 8 || confirmNewPassword.length < 8) {
            const notification = buildNotification('Passwords length must be as minimum 8 symbols', failureNotification);
            this.notificationDOMRef.current.addNotification(notification);

            return;
        }

        if (newPassword !== confirmNewPassword) {
            const notification = buildNotification('Passwords are not equal', failureNotification);
            this.notificationDOMRef.current.addNotification(notification);

            return;
        }

        const body = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        };

        return updatePasswordsProfileUser(role, id, body)
            .then(result => {
                const notification = buildNotification(result.message, successfulNotification);
                this.notificationDOMRef.current.addNotification(notification);
            })
            .catch(err => {
                const { errors } = JSON.parse(err.message);
                errors.forEach(item => {
                    const { msg: message } = item;
                    const notification = buildNotification(message, failureNotification);
                    this.notificationDOMRef.current.addNotification(notification);
                })
            });
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
            <Fragment>
                <ReactNotification ref={this.notificationDOMRef}/>
                <Component
                    onSave={this.onSave}
                    onChangePassword={this.onChangePassword}
                    onChangeTerritory={this.onChangeTerritory}
                    onChangeInput={this.onChangeInput}
                    data={this.state}
                    validatorProfile={this.validatorProfile}
                />
            </Fragment>
        );
    }
}
