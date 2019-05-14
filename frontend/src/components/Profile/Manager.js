import React from 'react';
import { Button, Card, Input } from '../../shared';

const Manager = () => {
    return (
      <Card.List>
        <Card>
          <Card.Item>
            <Card.Item.Label>Full name</Card.Item.Label>
            <Input />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>Territory</Card.Item.Label>
            <Input />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>Phone</Card.Item.Label>
            <Input type="phone" />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>Login</Card.Item.Label>
            <Input />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>Email</Card.Item.Label>
            <Input type="email" />
          </Card.Item>
          <Card.Item>
            <Button>Save</Button>
          </Card.Item>
        </Card>
        <Card>
          <Card.Item>
            <Card.Item.Label>Old Password</Card.Item.Label>
            <Input type="password" />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>New Password</Card.Item.Label>
            <Input type="password" />
          </Card.Item>
          <Card.Item>
            <Card.Item.Label>Confirm New Password</Card.Item.Label>
            <Input type="password" />
          </Card.Item>
          <Card.Item>
            <Button>Update Password</Button>
          </Card.Item>
        </Card>
      </Card.List>
    );
};

export default Manager;
