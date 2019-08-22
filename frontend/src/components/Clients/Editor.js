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
        data: {
            action,
            email,
            isRemoved,
            name,
            passportData,
            phone,
            role,
            selectedTerritory,
            territories,
        },
        onChangeInput,
        onChangeTerritory,
        onDeleteClient,
        onMarkClientForDeletion,
        onSave,
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
        <Card.List>
            <Card>
                <Card.Form noValidate>
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
                    {
                        ((role === 'admin' && action === 'edit') || (role === 'manager' && action === 'add')) &&
                        (
                            <Card.Item>
                                <Card.Item.Label htmlFor="territory">Territory</Card.Item.Label>
                                <ReactSelect
                                    value={selectedTerritory}
                                    onChange={onChangeTerritory}
                                    options={territories}
                                    placeholder="Select Territory ..."
                                />
                                {validator.message('territory', selectedTerritory, 'required')}
                            </Card.Item>
                        )}
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
                        {validator.message('email', email, 'required|email')}
                    </Card.Item>
                    <Card.Item>
                        <Card.Item.Label htmlFor="passportData">Passport Data</Card.Item.Label>
                        <Input
                            name="passportData"
                            value={passportData}
                            onChange={onChangeInput}
                            placeholder='Passport Data...'
                            required
                        />
                        {validator.message('passportData', passportData, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <Button onClick={onSave}>Save</Button>
                    </Card.Item>
                </Card.Form>
                {role === 'manager' && action === 'edit' && (
                    <Card noValidate>
                        <Card.Item>
                            <Card.Item.Label htmlFor="isRemoved">Mark the client for deletion</Card.Item.Label>
                            <Input
                                type='checkbox'
                                name='isRemoved'
                                onChange={onChangeInput}
                                checked={isRemoved}
                            />
                        </Card.Item>
                        <Card.Item>
                            <Button onClick={onMarkClientForDeletion}>Mark</Button>
                        </Card.Item>
                    </Card>
                )}
                {role === 'admin' && isRemoved && (
                    <Card.Form noValidate>
                        <Card.Item>
                            <Card.Item.Label htmlFor="isRemoved">Client for deletion</Card.Item.Label>
                            <Button onClick={onDeleteClient}>Delete</Button>
                        </Card.Item>
                    </Card.Form>
                )}
            </Card>
        </Card.List>
    );
};

Editor.defaultProps = {
    data: PropTypes.shape({
        action: '',
        name: '',
        email: '',
        isRemoved: null,
        phone: '',
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
    }),
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onDeleteClient: PropTypes.func,
    onMarkClientForDeletion: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    data: PropTypes.shape({
        action: '',
        name: '',
        email: '',
        isRemoved: null,
        phone: '',
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
    }),
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onDeleteClient: PropTypes.func,
    onMarkClientForDeletion: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Editor;
