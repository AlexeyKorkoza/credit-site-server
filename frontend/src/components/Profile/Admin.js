import React from 'react';

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
        <Card>
          <Card.Item>
            <Card.Item.Label>Login</Card.Item.Label>
            <Input
              name="login"
              value={login}
              onChange={onChangeInput}
              placeholder='Login...'
              required
            />
          </Card.Item>
          <Card.Item>
            <Button onClick={onSave}>Save</Button>
          </Card.Item>
        </Card>
        <Card>
          <Card.Item>
            <Card.Item.Label>Old Password</Card.Item.Label>
            <Input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={onChangeInput}
            />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>New Password</Card.Item.Label>
            <Input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={onChangeInput}
            />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>Confirm New Password</Card.Item.Label>
            <Input
              type="password"
              name="login"
              value={confirmNewPassword}
              onChange={onChangeInput}
            />
          </Card.Item>
          <Card.Item>
            <Button onClick={onChangePassword}>Change Password</Button>
          </Card.Item>
        </Card>
      </Card.List>
    );
};

export default Admin;
