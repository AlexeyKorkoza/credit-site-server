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
        const value = e.target.value;
        console.log('E', e);
        // this.setState({ name: value });
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

        const data = {
            login,
            password,
            selectedRole,
        };

        const key = 'user';

        logIn(data)
            .then(result => {
                setItem(key, result, true);
            })
            .catch(error => console.error('error', error.stack));
    }

    render() {

        return (
            <AuthenticationForm
                data={this.state}
                onInputChange={this.onInputChange}
                onSelectChange={this.onSelectChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default Authentication;
