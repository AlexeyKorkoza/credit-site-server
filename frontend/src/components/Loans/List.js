import React from 'react';
import PropTypes from 'prop-types';

import { Table } from '../../shared';
import List from './styles';

const ListComponent = props => {
    const { loans, role } = props;

    return (
        <List>
            {role === 'manager' && <List.Link.Add to="/loans/add">Add</List.Link.Add>}
            <Table>
                <Table.List>
                    {loans.map(loan => {
                        return (
                            <Table.List.Row>
                                <Table.List.Row.Column>
                                    {loan.amount}
                                </Table.List.Row.Column>
                                <Table.List.Row.Column>
                                    {loan.coefficient}
                                </Table.List.Row.Column>
                                <Table.List.Row.Column>
                                    {loan.dateIssue}
                                </Table.List.Row.Column>
                                <Table.List.Row.Column>
                                    {loan.dateMaturity}
                                </Table.List.Row.Column>
                                <Table.List.Row.Column>
                                    {loan.dateTotalRepaymentAmount}
                                </Table.List.Row.Column>
                                {role === 'admin' && <Table.List.Row.Column>
                                    <List.Link to={`/loans/${loan.id}`}>Edit</List.Link>
                                </Table.List.Row.Column>
                                }
                            </Table.List.Row>
                        );
                    })}
                </Table.List>
            </Table>
        </List>
    );
};

ListComponent.defaultProps = {
    loans: [],
    role: PropTypes.string,
};

ListComponent.propTypes = {
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
};

export default ListComponent;
