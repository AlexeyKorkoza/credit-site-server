import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { logIn } from '../api/authentication';
import AuthenticationForm from '../components/Authentication';
import { authUser, getDataAuthUser } from '../services/localDb';

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
            isActiveModal: false,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.isAuthUser();
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

        logIn(data)
            .then(result => {
                authUser(result);
                this.props.history.push('/');
            })
            .catch(error => console.error('error', error.stack));
    }

    isAuthUser() {
        const data = getDataAuthUser();

        if (!data) {
            this.setState({
                isActiveModal: true,
            });
        }
    }

    render() {
        const {
            login,
            password,
            selectedRole,
            roles,
            isActiveModal,
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
                isActiveModal={isActiveModal}
            />
        );
    }
}

export default withRouter(Authentication);
