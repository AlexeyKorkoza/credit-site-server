import React, { Component } from 'react';
import { withRouter } from "react-router";

import { List } from '../../components/Clients';
import { getAllClients } from '../../api/clients';
import { getDataAuthUser } from '../../services/localDb';
import { getManagerClients } from '../../api/managers';

class ClientsList extends Component{
    state = {
        clients: [],
        role: '',
    };

    componentDidMount() {
        const { role, id: managerId } = getDataAuthUser();
        const func = role === 'manager' ? getManagerClients : getAllClients;

        func(managerId)
            .then(result => {
                this.setState({ clients: result.clients, role });
            });
    }

    render() {
        const { clients, role } = this.state;

        return (
            <List
                clients={clients}
                role={role}
            />
        )
    }
}

export default withRouter(ClientsList);
