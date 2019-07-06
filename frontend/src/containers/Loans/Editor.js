import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { Editor as EditorComponent } from '../../components/Loans';
import {
    getLoan,
    saveLoan,
} from '../../api/loans';

class Editor extends Component {
    validator = new SimpleReactValidator();

    state = {
        action: '',
        amount: '',
        coefficient: '',
        dateIssue: '',
        dateMaturity: '',
        totalRepaymentAmount: '',
        territories: [
            {
                label: '0.5 %',
                value: '0.5',
            },
            {
                label: '1 %',
                value: '1',
            },
            {
                label: '1.5 %',
                value: '1.5',
            },
        ],
        loanId: null,
        selectedTerritory: {},
    };

    componentDidMount() {

        const {
            match: {
                params,
            },
        } = this.props;

        if (Object.keys(params).length > 0) {
            const { id: loanId } = params;

            getLoan(loanId)
                .then(result => {
                    const { territory } = result.data;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === territory);

                    this.setState({
                        ...result.data,
                        action: 'edit',
                        loanId,
                        selectedTerritory,
                    });
                })
        } else {
            this.setState({
                action: 'add',
            });
        }

    }

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onSave = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            return;
        }

        const {
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            totalRepaymentAmount,
            loanId,
            selectedTerritory,
        } = this.state;
        const { value: territory } = selectedTerritory;

        let body = {
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            territory,
            totalRepaymentAmount,
        };

        return saveLoan(body, loanId);
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    render() {
        return (
          <EditorComponent
            data={this.state}
            onChangeInput={this.onChangeInput}
            onChangeTerritory={this.onChangeTerritory}
            onSave={this.onSave}
            validator={this.validator}
          />
        );
    }
}

export default Editor;
