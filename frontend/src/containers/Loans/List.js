import React, { Component } from 'react';
import { withRouter } from "react-router";

import { getAllLoans } from '../../api/loans';
import { List } from '../../components/Loans';
import { getDataAuthUser } from "../../services/localDb";

class LoansList extends Component{
    state = {
        loans: [],
        role: null,
    };

    componentDidMount() {
        const { role } = getDataAuthUser();

        if (role === 'manager') {
            this.props.history.push('/loans/add');
            
            return;
        }

        getAllLoans()
            .then(result => {

                this.setState({ loans: result.loans, role });
            });
    }

    render() {
        const { loans, role } = this.state;

        return (
            <List
                loans={loans}
                role={role}
            />
        )
    }
}

export default withRouter(LoansList);
