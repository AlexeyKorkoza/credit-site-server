import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';

import { logIn } from '../api/authentication';
import AuthenticationForm from '../components/Authentication';
import { authUser, getDataAuthUser } from '../services/localDb';
import buildNotification from '../services/notification';
import Validator from "../shared/Validator";

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            element: message => <Validator>{message}</Validator>
        });

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
            notificationType: "Sign In"
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.isAuthUser();
    }

    onInputChange(e) {
        const target = e.target;
        const { value, name } = target;

        this.setState({
            [name]: value,
            message: '',
        });
    }

    onSelectChange(selectedRole) {
        this.setState({
            selectedRole,
            message: '',
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
            notificationType,
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
                const notification = buildNotification(message, notificationType);
                if (notification) {
                    this.notificationDOMRef.current.addNotification(notification);
                }
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
            message,
            notificationType,
            password,
            selectedRole,
            roles,
            isActiveModal,
        } = this.state;

        return (
            <Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <AuthenticationForm
                    login={login}
                    message={message}
                    password={password}
                    selectedRole={selectedRole}
                    roles={roles}
                    onInputChange={this.onInputChange}
                    onSelectChange={this.onSelectChange}
                    onSubmit={this.onSubmit}
                    isActiveModal={isActiveModal}
                    validator={this.validator}
                />
            </Fragment>
        );
    }
}

export default withRouter(Authentication);
