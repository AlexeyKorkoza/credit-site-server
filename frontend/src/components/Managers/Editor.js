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
        onBlockManager,
        onChangeInput,
        onChangePassword,
        onChangeTerritory,
        data: {
            action,
            login,
            fullName,
            phone,
            email,
            isBlocked,
            password,
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
                {action === 'add' && <Card.Item>
                    <Card.Item.Label htmlFor="password">Password</Card.Item.Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password ..."
                        value={password}
                        onChange={onChangeInput}
                        required
                    />
                    {validator.message('password', password, 'required|min:8')}
                </Card.Item>
                }
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
                    {validator.message('email', email, 'required|email')}
                </Card.Item>
                <Card.Item>
                    <Button onClick={onSave}>Save</Button>
                </Card.Item>
            </Card>
            {action === 'edit' && <Passwords
                onChangeInput={onChangeInput}
                onChangePassword={onChangePassword}
                oldPassword={oldPassword}
                newPassword={newPassword}
                confirmNewPassword={confirmNewPassword}
                isEmptyPasswordsFields={isEmptyPasswordsFields}
                isEqualNewPasswords={isEqualNewPasswords}
            />
            }
            <Card noValidate>
                <Card.Item>
                    <Card.Item.Label htmlFor="isBlocked">Is Blocked</Card.Item.Label>
                    <Input
                        type='checkbox'
                        name='isBlocked'
                        onChange={onChangeInput}
                        checked={isBlocked}
                    />
                </Card.Item>
                <Card.Item>
                    <Button onClick={onBlockManager}>Block</Button>
                </Card.Item>
            </Card>
        </Card.List>
    );
};

Editor.defaultProps = {
    onSave: PropTypes.func,
    onBlockManager: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        action: '',
        login: '',
        fullName: '',
        phone: '',
        email: '',
        isBlocked: null,
        password: '',
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
    onBlockManager: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        action: PropTypes.string,
        login: PropTypes.string,
        fullName: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        isBlocked: PropTypes.bool,
        password: PropTypes.string,
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
