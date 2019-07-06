import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from "react-select";

import { Button, Card, Input } from "../../../shared";

const Step1 = props => {
    const {
        data: {
            email,
            fullName,
            passportData,
            phone,
            selectedTerritory,
            surchargeFactor,
            territories,
        },
        onBack,
        onCreateClientCard,
        onChangeInput,
        onChangeTerritory,
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
        <Card.List>
            <Card noValidate>
                <Card.Item>
                    <Card.Item.Label htmlFor="fullName">Full Name</Card.Item.Label>
                    <Input
                        name='fullName'
                        placeholder='Full Name...'
                        onChange={onChangeInput}
                        value={fullName}
                        required
                    />
                    {validator.message('fullName', fullName, 'required')}
                </Card.Item>
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
                    <Card.Item.Label htmlFor="surchargeFactor">Surcharge Factor</Card.Item.Label>
                    <Input
                        type="number"
                        name="surchargeFactor"
                        value={surchargeFactor}
                        onChange={onChangeInput}
                        placeholder='Surcharge Factor...'
                        required
                    />
                    {validator.message('surchargeFactor', surchargeFactor, 'required')}
                </Card.Item>
                <Card.Item>
                    <Button onClick={onBack}>Back</Button>
                    <Button onClick={onCreateClientCard}>Issue a loan</Button>
                </Card.Item>
            </Card>
        </Card.List>
    );
};

Step1.defaultProps = {
    data: PropTypes.shape({
        email: '',
        fullName: '',
        passportData: '',
        phone: '',
        selectedTerritory: '',
        surchargeFactor: 0,
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
    }),
    onBack: PropTypes.func,
    onCreateClientCard: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    validator: PropTypes.shape(),
};

Step1.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string,
        fullName: PropTypes.string,
        passportData: PropTypes.string,
        phone: PropTypes.string,
        selectedTerritory: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
        surchargeFactor: 0,
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
    }),
    onBack: PropTypes.func,
    onCreateClientCard: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Step1;
