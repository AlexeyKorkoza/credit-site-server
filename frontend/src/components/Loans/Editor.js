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
        <Card noValidate>
          <Card.Item>
            <Card.Item.Label htmlFor="amount">Amount</Card.Item.Label>
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
              onChange={onChangeTerritory}
              options={territories}
              placeholder="Select Territory ..."
            />
            {validator.message('territory', selectedTerritory, 'required')}
          </Card.Item>
          <Card.Item>
                <Card.Item.Label htmlFor="coefficient">Coefficient</Card.Item.Label>
                <Input
                    name="coefficient"
                    value={coefficient}
                    onChange={onChangeInput}
                    placeholder='Coefficient...'
                    required
                />
                {validator.message('coefficient', coefficient, 'required')}
            </Card.Item>
          <Card.Item>
                <Card.Item.Label htmlFor="dateIssue">Date Issue</Card.Item.Label>
                <Input
                    name="dateIssue"
                    value={dateIssue}
                    onChange={onChangeInput}
                    placeholder='Date Issue...'
                    required
                />
                {validator.message('dateIssue', dateIssue, 'required')}
            </Card.Item>
          <Card.Item>
            <Card.Item.Label htmlFor="dateMaturity">Date Maturity</Card.Item.Label>
            <Input
              name='dateMaturity'
              placeholder='Date Maturity...'
              onChange={onChangeInput}
              value={dateMaturity}
              required
            />
            {validator.message('dateMaturity', dateMaturity, 'required')}
          </Card.Item>
          <Card.Item>
            <Card.Item.Label htmlFor="dateIssue">Date Issue</Card.Item.Label>
            <Input
              name="dateIssue"
              value={dateIssue}
              onChange={onChangeInput}
              placeholder='Date Issue...'
              required
            />
            {validator.message('dateIssue', dateIssue, 'required')}
          </Card.Item>
          <Card.Item>
                <Card.Item.Label htmlFor="totalRepaymentAmount">Total Repayment Amount</Card.Item.Label>
                <Input
                    name='totalRepaymentAmount'
                    placeholder='Total Repayment Amount...'
                    onChange={onChangeInput}
                    value={totalRepaymentAmount}
                    required
                />
                {validator.message('totalRepaymentAmount', totalRepaymentAmount, 'required')}
            </Card.Item>
          <Card.Item>
            <Button onClick={onSave}>Save</Button>
          </Card.Item>
        </Card>
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
