import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Error,
    Input,
} from '../../shared';

const Passwords = props => {
    const {
        onChangeInput,
        onChangePassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
        isEmptyPasswordsFields,
        isEqualNewPasswords,
    } = props;

    return (
        <Card>
            <Card.Item>
                <Card.Item.Label htmlFor="oldPassword">Old Password</Card.Item.Label>
                <Input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={onChangeInput}
                />
            </Card.Item>
            <Card.Item>
                <Card.Item.Label htmlFor="newPassword">New Password</Card.Item.Label>
                <Input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChangeInput}
                />
            </Card.Item>
            <Card.Item>
                <Card.Item.Label htmlFor="confirmNewPassword">Confirm New Password</Card.Item.Label>
                <Input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={onChangeInput}
                />
                {isEmptyPasswordsFields && <Error>Please, enter fill in</Error>}
                {!isEqualNewPasswords && <Error>Please, passwords are not equal</Error>}
            </Card.Item>
            <Card.Item>
                <Button onClick={onChangePassword}>Change Password</Button>
            </Card.Item>
        </Card>
    );
};

Passwords.defaultProps = {
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    isEmptyPasswordsFields: PropTypes.bool,
    isEqualNewPasswords: PropTypes.bool,
};

Passwords.propTypes = {
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmNewPassword: PropTypes.string,
    isEmptyPasswordsFields: PropTypes.bool,
    isEqualNewPasswords: PropTypes.bool,
};

export default Passwords;
