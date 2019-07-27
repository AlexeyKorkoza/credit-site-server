import React from 'react';
import PropTypes from 'prop-types';

import { Table } from '../../shared';
import List from './styles';

const ListComponent = props => {
    const { clients, role } = props;

    return (
        <List>
            {role === 'manager' && <List.Link.Add to="/clients/add">Add</List.Link.Add>}
            <Table>
                <Table.List>
                    {clients.map(client => {
                        return (
                            <Table.List.Row>
                                <Table.List.Row.Column>
                                    {client.name}
                                </Table.List.Row.Column>
                                <Table.List.Row.Column>
                                    {client.email}
                                </Table.List.Row.Column>
                                <Table.List.Row.Column>
                                    <List.Link to={`/clients/${client.id}`}>Edit</List.Link>
                                </Table.List.Row.Column>
                                {role === 'manager' && <Table.List.Row.Column>
                                    <List.Link
                                        to={{
                                            pathname: `/loans/add`,
                                            state: { clientId: client.id }
                                        }}>Add new loan</List.Link>
                                </Table.List.Row.Column>}
                            </Table.List.Row>
                        );
                    })}
                </Table.List>
            </Table>
        </List>
    );
};

ListComponent.defaultProps = {
    clients: [],
    role: PropTypes.string,
};

ListComponent.propTypes = {
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            email: PropTypes.string,
            full_name: PropTypes.string,
            id: PropTypes.number,
            is_blocked: PropTypes.bool,
            login: PropTypes.string,
        })
    ),
    role: PropTypes.string,
};

export default ListComponent;