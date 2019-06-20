import React, { Component } from 'react';
import { withRouter } from "react-router";

import { getAllClients } from '../../api/clients';
import { List } from '../../components/Clients';

class ClientsList extends Component{
    state = {
        clients: [],
    };

    componentDidMount() {
        getAllClients()
            .then(result => {
                this.setState({ clients: result.clients });
            });
    }

    render() {
        const { clients } = this.state;

        return (
            <List
                clients={clients}
            />
        )
    }
}

export default withRouter(ClientsList);
