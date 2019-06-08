import React from 'react';
import ReactSelect from "react-select";
import PropTypes from "prop-types";

import {
    Button,
    Card,
    Input,
} from '../../shared';
import Login from "../Profile/Login";
import Passwords from "../Profile/Passwords";

const Editor = props => {
    const {
        onSave,
        onChangeInput,
        onChangePassword,
        onChangeTerritory,
        data: {
            login,
            fullName,
            phone,
            email,
            oldPassword,
            newPassword,
            confirmNewPassword,
            territories,
            selectedTerritory,
            isEmptyPasswordsFields,
            isEqualNewPasswords,
        },
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
        <Card.List>
            <Card noValidate>
                <Card.Item>
                    <Card.Item.Label htmlFor="fullName">Full name</Card.Item.Label>
                    <Input
                        name='fullName'
                        placeholder='Full name...'
                        onChange={onChangeInput}
                        value={fullName}
                        required
                    />
                    {validator.message('fullName', fullName, 'required')}
                </Card.Item>
                <Card.Item>
                    <Card.Item.Label htmlFor="territory">Territory</Card.Item.Label>
                    <ReactSelect
                        value={selectedTerritory}
                        onChange={onChangeTerritory}
                        options={territories}
                        placeholder={'Select Territory ...'}
                    />
                    {validator.message('territory', selectedTerritory, 'required')}
                </Card.Item>
                <Card.Item>
                    <Card.Item.Label htmlFor="phone">Phone</Card.Item.Label>
                    <Input
                        type="phone"
                        name='phone'
                        placeholder='Phone...'
                        onChange={onChangeInput}
                        value={phone}
                        required
                    />
                    {validator.message('phone', phone, 'required')}
                </Card.Item>
                <Login
                    login={login}
                    onChangeInput={onChangeInput}
                    validatorProfile={validator}
                />
                <Card.Item>
                    <Card.Item.Label htmlFor="email">Email</Card.Item.Label>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChangeInput}
                        placeholder='Email...'
                        required
                    />
                    {validator.message('email', email, 'required')}
                </Card.Item>
                <Card.Item>
                    <Button onClick={onSave}>Save</Button>
                </Card.Item>
            </Card>
            <Passwords
                onChangeInput={onChangeInput}
                onChangePassword={onChangePassword}
                oldPassword={oldPassword}
                newPassword={newPassword}
                confirmNewPassword={confirmNewPassword}
                isEmptyPasswordsFields={isEmptyPasswordsFields}
                isEqualNewPasswords={isEqualNewPasswords}
            />
        </Card.List>
    );
};

Editor.defaultProps = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        login: '',
        fullName: '',
        phone: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        login: PropTypes.string,
        fullName: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        oldPassword: PropTypes.string,
        newPassword: PropTypes.string,
        confirmNewPassword: PropTypes.string,
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validator: PropTypes.shape(),
};

export default Editor;
