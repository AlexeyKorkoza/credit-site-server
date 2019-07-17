import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import { logIn } from '../api/authentication';
import AuthenticationForm from '../components/Authentication';
import { authUser, getDataAuthUser } from '../services/localDb';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            login: '',
            message: '',
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
            isShowErrorMessages: false,
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
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.setState({
                isShowErrorMessages: true,
            });
            return;
        }

        this.setState({
            isShowErrorMessages: false,
        });

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
                this.props.history.push('/profile');
            })
            .catch(error => {
                const { message } = error;
                this.setState({ message });
                console.error('error', error.stack)
            });
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
                validator={this.validator}
            />
        );
    }
}

export default withRouter(Authentication);
