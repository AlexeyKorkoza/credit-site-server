import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Input,
} from '../../shared';

const Passwords = props => {
    const {
        onChangeInput,
        onChangePassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
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
};

Passwords.propTypes = {
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmNewPassword: PropTypes.string,
};

export default Passwords;
