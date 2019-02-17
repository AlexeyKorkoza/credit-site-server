import React, { Component } from 'react';

import { logIn } from '../api/authentication';
import AuthenticationForm from '../components/Authentication';
import { setItem } from '../core/localStorage';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            selectedRole: null,
            roles: [
                {
                    label: 'admin',
                    value: 'admin',
                },
                {
                    label: 'manager',
                    value: 'manager',
                },
            ],
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(e) {
        const target = e.target;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    }

    onSelectChange(selectedRole) {
        this.setState({
            selectedRole,
        });
    }

    onSubmit() {
        const {
            login,
            password,
            selectedRole,
        } = this.state;

        const { value: role } = selectedRole;

        const data = {
            login,
            password,
            role,
        };

        const key = 'user';

        logIn(data)
            .then(result => {
                setItem(key, result, true);
            })
            .catch(error => console.error('error', error.stack));
    }

    render() {
        const {
            login,
            password,
            selectedRole,
            roles,
        } = this.state;

        return (
            <AuthenticationForm
                login={login}
                password={password}
                selectedRole={selectedRole}
                roles={roles}
                onInputChange={this.onInputChange}
                onSelectChange={this.onSelectChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default Authentication;
