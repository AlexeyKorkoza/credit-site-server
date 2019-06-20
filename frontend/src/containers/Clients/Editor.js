import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { Editor as EditorComponent } from '../../components/Managers';
import {
    blockManager,
    getManager,
    saveManager,
} from '../../api/managers';
import { updatePasswordsProfileUser } from '../../api/profile';

class Editor extends Component {
    validator = new SimpleReactValidator();

    state = {
        action: '',
        email: '',
        fullName: '',
        login: '',
        phone: '',
        isBlocked: null,
        password: '',
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
        managerId: null,
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
                    const { territory } = result.data;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === territory);

                    this.setState({
                        ...result.data,
                        action: 'edit',
                        managerId,
                        selectedTerritory,
                    });
                })
        } else {
            this.setState({
                action: 'add',
            });
        }

    }

    onBlockManager = event => {
        event.preventDefault();

        const { managerId } = this.state;

        return blockManager(managerId);
    };

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onSave = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            return;
        }

        const {
            action,
            email,
            fullName,
            login,
            managerId,
            password,
            phone,
            selectedTerritory,
        } = this.state;
        const { value: territory } = selectedTerritory;

        let body = {
            login,
            fullName,
            territory,
            password,
            phone,
            email
        };

        return action === 'edit'
            ? saveManager(body, managerId)
            : saveManager(body);
    };

    onChangePassword = event => {
        event.preventDefault();

        this.setState({
            isEqualNewPasswords: true,
            isEmptyPasswordsFields: false,
        });

        const {
            oldPassword,
            managerId,
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

        return updatePasswordsProfileUser('manager', managerId, body);
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
            onBlockManager={this.onBlockManager}
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
