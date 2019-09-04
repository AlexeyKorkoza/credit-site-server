import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';

import { Editor as EditorComponent } from '../../components/Loans';
import { loans } from '../../api';
import { calculation, notification } from "../../services";
import { Validator } from "../../shared";

class Editor extends Component {
    notificationDOMRef = React.createRef();
    validator = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });

    state = {
        action: '',
        amount: 0, // surchargeFactor
        coefficient: '',
        dateIssue: '',
        dateMaturity: '',
        focusedDateMaturity: null,
        focusedDateIssue: null,
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
        failureNotificationType: 'FailureEditingLoan',
        successfulNotificationType: 'SuccessfulEditingLoan',
    };

    componentDidMount() {
        const {
            match: {
                params,
            },
        } = this.props;

        if (Object.keys(params).length > 0) {
            const { id: loanId } = params;

            loans.getLoan(loanId)
                .then(result => {
                    const { territory } = result.loan;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === +territory);

                    this.setState({
                        ...result.loan,
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

    onChangeDateIssue = dateIssue => {
        const { dateMaturity } = this.state;

        const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, this.state);

        this.setState(result);
    };

    onChangeDateMaturity = dateMaturity => {
        const { dateIssue } = this.state;

        const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, this.state);

        this.setState(result);
    };

    onSave = event => {
        event.preventDefault();

        const {
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            totalRepaymentAmount,
            loanId,
            selectedTerritory,
            failureNotificationType,
            successfulNotificationType,
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

        return loans.saveLoan(body, loanId)
            .then(() => {
                const message = 'Loan was edited successfully';
                const builtNotification = notification.buildNotification(message, successfulNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            })
            .catch(error => {
                const { message } = error;
                const builtNotification = notification.buildNotification(message, failureNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    onFocusedDateIssue = ({ focused }) => {
        this.setState({
            focusedDateIssue: focused,
        });
    };

    onFocusedDateMaturity = ({ focused }) => {
        this.setState({
            focusedDateMaturity: focused,
        });
    };

    render() {
        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <EditorComponent
              data={this.state}
              onChangeDateIssue={this.onChangeDateIssue}
              onChangeDateMaturity={this.onChangeDateMaturity}
              onChangeInput={this.onChangeInput}
              onChangeTerritory={this.onChangeTerritory}
              onFocusedDateIssue={this.onFocusedDateIssue}
              onFocusedDateMaturity={this.onFocusedDateMaturity}
              onSave={this.onSave}
              validator={this.validator}
            />
          </Fragment>
        );
    }
}

export default Editor;
