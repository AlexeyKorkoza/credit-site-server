import React, { Component } from 'react';
import { withRouter } from "react-router";

import { loans } from '../../api';
import { List } from '../../components/Loans';
import { localDb } from "../../services";

class LoansList extends Component{
    state = {
        loans: [],
        role: null,
    };

    componentDidMount() {
        const { role } = localDb.getDataAuthUser();

        if (role === 'manager') {
            this.props.history.push('/loans/add');

            return;
        }

        loans.getAllLoans()
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
