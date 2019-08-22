import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import Login from './Login';
import Passwords from './Passwords';
import {
    Button,
    Card,
    Input,
} from '../../shared';

const Manager = props => {
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
        validatorProfile,
    } = props;

    if (!validatorProfile.allValid()) {
        validatorProfile.showMessages();
    }

    return (
        <Card.List>
            <Card>
                <Card.Form noValidate>
                    <Card.Item>
                        <Card.Item.Label htmlFor="fullName">Full name</Card.Item.Label>
                        <Input
                            name='fullName'
                            placeholder='Full name...'
                            onChange={onChangeInput}
                            value={fullName}
                            required
                        />
                        {validatorProfile.message('fullName', fullName, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <Card.Item.Label htmlFor="territory">Territory</Card.Item.Label>
                        <ReactSelect
                            value={selectedTerritory}
                            onChange={onChangeTerritory}
                            options={territories}
                            placeholder={'Select Territory ...'}
                        />
                        {validatorProfile.message('territory', selectedTerritory, 'required')}
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
                        {validatorProfile.message('phone', phone, 'required')}
                    </Card.Item>
                    <Login
                        login={login}
                        onChangeInput={onChangeInput}
                        validatorProfile={validatorProfile}
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
                        {validatorProfile.message('email', email, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <Button onClick={onSave}>Save</Button>
                    </Card.Item>
                </Card.Form>
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

Manager.defaultProps = {
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
    validatorProfile: PropTypes.shape(),
};

Manager.propTypes = {
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
    validatorProfile: PropTypes.shape(),
};

export default Manager;
