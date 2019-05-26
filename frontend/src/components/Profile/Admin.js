import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Input } from '../../shared';

const Admin = props => {
    const {
        onSave,
        onChangeInput,
        onChangePassword,
        data: {
            login,
            oldPassword,
            newPassword,
            confirmNewPassword,
        },
    } = props;

    return (
      <Card.List>
        <Card
            noValidate
            onSubmit={onSave}
        >
          <Card.Item>
            <Card.Item.Label htmlFor="login">Login</Card.Item.Label>
            <Input
              name="login"
              value={login}
              onChange={onChangeInput}
              placeholder='Login...'
              required
            />
          </Card.Item>
          <Card.Item>
            <Button>Save</Button>
          </Card.Item>
        </Card>
        <Card
            noValidate
            onSubmit={onChangePassword}
        >
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
            <Button>Change Password</Button>
          </Card.Item>
        </Card>
      </Card.List>
    );
};

Admin.defaultProps = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    data: PropTypes.shape({
        login: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }),
};

Admin.propTypes = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    data: PropTypes.shape({
        login: PropTypes.string,
        oldPassword: PropTypes.string,
        newPassword: PropTypes.string,
        confirmNewPassword: PropTypes.string,
    }),
};

export default Admin;
