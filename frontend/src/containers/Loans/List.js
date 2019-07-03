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
        getAllLoans()
            .then(result => {
                const { role } = getDataAuthUser();

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
