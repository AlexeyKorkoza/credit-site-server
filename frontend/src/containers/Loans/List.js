import React, { Component } from 'react';
import { withRouter } from "react-router";

import { getAllLoans } from '../../api/loans';
import { List } from '../../components/Loans';

class LoansList extends Component{
    state = {
        loans: [],
    };

    componentDidMount() {
        getAllLoans()
            .then(result => {
                this.setState({ loans: result.loans });
            });
    }

    render() {
        const { loans } = this.state;

        return (
            <List
                loans={loans}
            />
        )
    }
}

export default withRouter(LoansList);
