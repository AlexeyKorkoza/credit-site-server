import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Error,
    Input,
} from '../../shared';

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
            isEmptyPasswordsFields,
            isEqualNewPasswords,
        },
        validatorProfile,
    } = props;

    if (!validatorProfile.allValid()) {
        validatorProfile.showMessages();
    }

    return (
      <Card.List>
        <Card noValidate>
          <Card.Item>
            <Card.Item.Label htmlFor="login">Login</Card.Item.Label>
            <Input
              name="login"
              value={login}
              onChange={onChangeInput}
              placeholder='Login...'
              required
            />
              {validatorProfile.message('login', login, 'required')}
          </Card.Item>
          <Card.Item>
            <Button onClick={onSave}>Save</Button>
          </Card.Item>
        </Card>
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
              { isEmptyPasswordsFields && <Error>Please, enter fill in</Error> }
              { !isEqualNewPasswords && <Error>Please, passwords are not equal</Error> }
          </Card.Item>
          <Card.Item>
              <Button onClick={onChangePassword}>Change Password</Button>
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
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validatorProfile: PropTypes.shape(),
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
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validatorProfile: PropTypes.shape(),
};

export default Admin;
