import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from "react-select";
import { DateRangePicker } from 'react-dates';

import LoansTable from '../Table';
import List from '../styles';
import { Button, Card, Input } from "../../../shared";

const outputProperties = ['dateMaturity'];

const Step2 = props => {
    const {
        data: {
            amount,
            clientName,
            dateIssue,
            dateMaturity,
            focusedInput,
            loans,
            role,
            selectedTerritory,
            territories,
            totalRepaymentAmount,
        },
        onChangeDates,
        onChangeInput,
        onCreateLoan,
        onFocusedInput,
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
        <div>
            <h1>{clientName} loans</h1>
            {loans && loans.length > 0
                ? <List>
                    <LoansTable
                        loans={loans}
                        outputProperties={outputProperties}
                        role={role}
                    />
                </List>
                : <h1>No loans</h1>
            }
            <Card.List>
                <Card noValidate>
                    <Card.Item>
                        <Card.Item.Label htmlFor="amount">Amount</Card.Item.Label>
                        <Input
                            name='amount'
                            placeholder='Amount ...'
                            onChange={onChangeInput}
                            value={amount}
                            disabled={true}
                        />
                        {validator.message('amount', amount, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <Card.Item.Label htmlFor="territory">Territory</Card.Item.Label>
                        <ReactSelect
                            value={selectedTerritory}
                            options={territories}
                            placeholder="Select Territory ..."
                            isDisabled={true}
                        />
                        {validator.message('territory', selectedTerritory, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <DateRangePicker
                            startDate={dateIssue}
                            startDateId="date_issue_id"
                            endDate={dateMaturity}
                            endDateId="date_maturity_id"
                            onDatesChange={onChangeDates}
                            focusedInput={focusedInput}
                            onFocusChange={onFocusedInput}
                        />
                    </Card.Item>
                    <Card.Item>
                        <Card.Item.Label htmlFor="totalRepaymentAmount">Total Repayment Amount</Card.Item.Label>
                        <Input
                            type="number"
                            name="totalRepaymentAmount"
                            value={totalRepaymentAmount}
                            onChange={onChangeInput}
                            placeholder='Total Repayment Amount...'
                            disabled={true}
                        />
                        {validator.message('totalRepaymentAmount', totalRepaymentAmount, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <Button onClick={onCreateLoan}>Create loan</Button>
                    </Card.Item>
                </Card>
            </Card.List>
        </div>
    );
};

Step2.defaultProps = {
    data: PropTypes.shape({
        amount: '',
        clientName: '',
        dateIssue: '',
        dateMaturity: '',
        focusedInput: '',
        loans: '',
        role: '',
        selectedTerritory: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: 0,
    }),
    onChangeDates: PropTypes.func,
    onChangeInput: PropTypes.func,
    onCreateLoan: PropTypes.func,
    onFocusedInput: PropTypes.func,
    validator: PropTypes.shape,
};

Step2.propTypes = {
    data: PropTypes.shape({
        amount: PropTypes.string,
        clientName: PropTypes.string,
        dateIssue: PropTypes.shape(),
        dateMaturity: PropTypes.shape(),
        focusedInput: PropTypes.shape(),
        loans: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number,
                coefficient: PropTypes.number,
                dateIssue: PropTypes.string,
                dateMaturity: PropTypes.string,
                totalRepaymentAmount: PropTypes.number,
                id: PropTypes.number,
            })
        ),
        role: PropTypes.string,
        selectedTerritory: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: 0,
    }),
    onChangeDates: PropTypes.func,
    onChangeInput: PropTypes.func,
    onCreateLoan: PropTypes.func,
    onFocusedInput: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Step2;
