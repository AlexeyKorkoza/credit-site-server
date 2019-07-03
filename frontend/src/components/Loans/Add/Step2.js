import React from 'react';
import ReactSelect from "react-select";
import { DateRangePicker } from 'react-dates';

import LoansTable from '../Table';
import List from '../styles';
import { Button, Card, Input } from "../../../shared";

const outputProperties = ['dateIssue'];

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
                        <Card.Item.Label htmlFor="amount">amount</Card.Item.Label>
                        <Input
                            name='amount'
                            placeholder='Amount ...'
                            onChange={onChangeInput}
                            value={amount}
                            required
                        />
                        {validator.message('amount', amount, 'required')}
                    </Card.Item>
                    <Card.Item>
                        <Card.Item.Label htmlFor="territory">Territory</Card.Item.Label>
                        <ReactSelect
                            value={selectedTerritory}
                            options={territories}
                            placeholder="Select Territory ..."
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
                            name="totalRepaymentAmount"
                            value={totalRepaymentAmount}
                            onChange={onChangeInput}
                            placeholder='Total Repayment Amount...'
                            required
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

export default Step2;
