import React, { Component } from 'react';
import { withRouter } from "react-router";

import { getManagers } from '../../api/managers';
import { List } from '../../components/Managers';

class ManagersList extends Component{
    state = {
        managers: [],
    };

    componentDidMount() {
        getManagers()
            .then(result => {
                this.setState({ managers: result.managers });
            });
    }

    render() {
        const { managers } = this.state;

        return (
            <List
                managers={managers}
            />
        )
    }
}

export default withRouter(ManagersList);
