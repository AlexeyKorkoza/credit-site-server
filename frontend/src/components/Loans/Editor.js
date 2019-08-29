import React from 'react';
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-dates";
import moment from 'moment';

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
            focusedInput,
            totalRepaymentAmount,
            selectedTerritory,
            territories,
        },
        onChangeDates,
        onChangeInput,
        onChangeTerritory,
        onFocusedInput,
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
                        <Card.Form.Label htmlFor="coefficient">Date Issue - Date Maturity</Card.Form.Label>
                        <DateRangePicker
                            startDate={moment(dateIssue)}
                            startDateId="date_issue_id"
                            endDate={moment(dateMaturity)}
                            endDateId="date_maturity_id"
                            onDatesChange={onChangeDates}
                            focusedInput={focusedInput}
                            onFocusChange={onFocusedInput}
                        />
                    </Card.Form.Item>
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
    onChangeDates: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onFocusedInput: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    data: PropTypes.shape({
        amount: PropTypes.number,
        coefficient: PropTypes.number,
        dateIssue: PropTypes.string,
        dateMaturity: PropTypes.string,
        focusedInput: PropTypes.shape(),
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
    onChangeDates: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onFocusedInput: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Editor;
