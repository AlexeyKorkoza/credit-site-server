import React from 'react';

import { Button, Card, Input } from '../../shared';

const Admin = props => {
    return (
      <Card>
        <Card.Item>
          <Card.Item.Label>Login</Card.Item.Label>
          <Input />
        </Card.Item>
        <Card.Item>
          <Card.Item.Label>Old Password</Card.Item.Label>
          <Input />
        </Card.Item>
        <Card.Item>
          <Card.Item.Label>New Password</Card.Item.Label>
          <Input />
        </Card.Item>
        <Card.Item>
          <Card.Item.Label>Confirm New Password</Card.Item.Label>
          <Input />
        </Card.Item>
        <Button>Save</Button>
      </Card>
    )
};

export default Admin;
