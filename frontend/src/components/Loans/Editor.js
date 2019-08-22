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
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            totalRepaymentAmount,
            selectedTerritory,
            territories,
        },
        onChangeInput,
        onChangeTerritory,
        onSave,
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
        <Card.List>
            <Card.List.Item>
                <Card.Form noValidate>
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="amount">Amount</Card.Form.Label>
                        <Input
                            name='amount'
                            placeholder='Amount ...'
                            onChange={onChangeInput}
                            value={amount}
                            required
                        />
                    </Card.Form.Item>
                    {validator.message('amount', amount, 'required')}
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
                        <ReactSelect
                            value={selectedTerritory}
                            onChange={onChangeTerritory}
                            options={territories}
                            placeholder="Select Territory ..."
                        />
                    </Card.Form.Item>
                    {validator.message('territory', selectedTerritory, 'required')}
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="coefficient">Coefficient</Card.Form.Label>
                        <Input
                            name="coefficient"
                            value={coefficient}
                            onChange={onChangeInput}
                            placeholder='Coefficient...'
                            required
                        />
                    </Card.Form.Item>
                    {validator.message('coefficient', coefficient, 'required')}
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="dateIssue">Date Issue</Card.Form.Label>
                        <Input
                            name="dateIssue"
                            value={dateIssue}
                            onChange={onChangeInput}
                            placeholder='Date Issue...'
                            required
                        />
                    </Card.Form.Item>
                    {validator.message('dateIssue', dateIssue, 'required')}
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="dateMaturity">Date Maturity</Card.Form.Label>
                        <Input
                            name='dateMaturity'
                            placeholder='Date Maturity...'
                            onChange={onChangeInput}
                            value={dateMaturity}
                            required
                        />
                    </Card.Form.Item>
                    {validator.message('dateMaturity', dateMaturity, 'required')}
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="dateIssue">Date Issue</Card.Form.Label>
                        <Input
                            name="dateIssue"
                            value={dateIssue}
                            onChange={onChangeInput}
                            placeholder='Date Issue...'
                            required
                        />
                    </Card.Form.Item>
                    {validator.message('dateIssue', dateIssue, 'required')}
                    <Card.Form.Item>
                        <Card.Form.Label htmlFor="totalRepaymentAmount">Total Repayment Amount</Card.Form.Label>
                        <Input
                            name='totalRepaymentAmount'
                            placeholder='Total Repayment Amount...'
                            onChange={onChangeInput}
                            value={totalRepaymentAmount}
                            required
                        />
                    </Card.Form.Item>
                    {validator.message('totalRepaymentAmount', totalRepaymentAmount, 'required')}
                    <Card.Form.Item>
                        <Button onClick={onSave}>Save</Button>
                    </Card.Form.Item>
                </Card.Form>
            </Card.List.Item>
        </Card.List>
    );
};

Editor.defaultProps = {
    data: PropTypes.shape({
        amount: '',
        coefficient: '',
        dateIssue: '',
        dateMaturity: '',
        selectedTerritory: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: '',
    }),
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    data: PropTypes.shape({
        amount: PropTypes.number,
        coefficient: PropTypes.number,
        dateIssue: PropTypes.string,
        dateMaturity: PropTypes.string,
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: PropTypes.number,
    }),
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Editor;
