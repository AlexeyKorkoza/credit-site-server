import React from 'react';
import ReactSelect from "react-select";
import PropTypes from "prop-types";

import {
    Button,
    Card,
    Input,
} from '../../shared';

const Editor = props => {
    const {
        onSave,
        onChangeInput,
        onChangeTerritory,
        data: {
            action,
            email,
            isRemoved,
            name,
            passportData,
            phone,
            selectedTerritory,
            territories,
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
                    <Card.Item.Label htmlFor="name">Name</Card.Item.Label>
                    <Input
                        name='name'
                        placeholder='Name...'
                        onChange={onChangeInput}
                        value={name}
                        required
                    />
                    {validator.message('name', name, 'required')}
                </Card.Item>
                {role === 'admin' && <Card.Item>
                    <Card.Item.Label htmlFor="territory">Territory</Card.Item.Label>
                    <ReactSelect
                        value={selectedTerritory}
                        onChange={onChangeTerritory}
                        options={territories}
                        placeholder={'Select Territory ...'}
                    />
                    {validator.message('territory', selectedTerritory, 'required')}
                </Card.Item>
                }
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
            <Card noValidate>
                <Card.Item>
                    <Card.Item.Label htmlFor="isRemoved">Is Removed</Card.Item.Label>
                    <Input
                        type='checkbox'
                        name='isRemoved'
                        onChange={onChangeInput}
                        checked={isRemoved}
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
