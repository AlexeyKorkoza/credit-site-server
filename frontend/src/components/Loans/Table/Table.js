import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

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
                                if (item === 'dateMaturity' || item === 'dateIssue') {
                                    return (
                                        <Table.List.Row.Column>
                                            {dateFns.format(loan[item], 'MM/DD/YYYY')}
                                        </Table.List.Row.Column>
                                    );
                                }

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
    outputProperties: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
    role: PropTypes.string,
};

export default LoansTable;
