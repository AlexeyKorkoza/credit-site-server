import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { Editor as EditorComponent } from '../../components/Managers';
import { updatePasswordsProfileUser, updateProfileUser } from "../../api/profile";
import { getManager } from '../../api/managers';

class Editor extends Component {
    validator = new SimpleReactValidator();

    state = {
        action: '',
        email: '',
        fullName: '',
        login: '',
        phone: '',
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

        const {
            match: {
                params,
            },
        } = this.props;

        if (Object.keys(params).length > 0) {
            const { id: managerId } = params;

            getManager(managerId)
                .then(result => {
                    this.setState({ ...result.data });
                })
        } else {
            this.setState({
                action: 'add',
            });
        }

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
        return (
          <EditorComponent
            data={this.state}
            onChangeInput={this.onChangeInput}
            onChangePassword={this.onChangePassword}
            onChangeTerritory={this.onChangeTerritory}
            onSave={this.onSave}
            validator={this.validator}
          />
        );
    }
}

export default Editor;
