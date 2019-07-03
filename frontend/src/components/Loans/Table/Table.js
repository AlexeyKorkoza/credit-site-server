import React from 'react';
import PropTypes from 'prop-types';

import { Table } from '../../../shared';
import List from '../styles';

const LoansTable = props => {
    const { loans, outputProperties, role } = props;

    return (
        <Table>
            <Table.List>
                {loans.map(loan => {
                    return (
                        <Table.List.Row>
                            {outputProperties.map(item => {
                                return (
                                    <Table.List.Row.Column>
                                        {loan[item]}
                                    </Table.List.Row.Column>
                                );
                            })}
                            {role === 'admin' && <Table.List.Row.Column>
                                <List.Link to={`/loans/${loan.id}`}>Edit</List.Link>
                            </Table.List.Row.Column>
                            }
                        </Table.List.Row>
                    );
                })}
            </Table.List>
        </Table>
    );
};

LoansTable.defaultProps = {
    loans: [],
    outputProperties: [],
    role: PropTypes.string,
};

LoansTable.propTypes = {
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
    outputProperties: PropTypes.arrayOf(),
    role: PropTypes.string,
};

export default LoansTable;
