import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { getDataAuthUser } from "../../services/localDb";
import { getClient, getClientLoans } from "../../api/clients";
import { createClientCard } from "../../api/client_card";
import { saveLoan } from '../../api/loans';
import Steps from '../../components/Loans/Add';
import { convertToDays, subtractDates } from "../../utils";

const { Step1, Step2 } = Steps;
const components = {
    1: Step1,
    2: Step2,
};

class Add extends Component {
    validator = new SimpleReactValidator();

    state = {
        email: '',
        fullName: '',
        phone: '',
        selectedTerritory: {},
        passportData: '',
        surchargeFactor: '',

        clientId: null,
        clientName: '',

        currentStep: 1,

        amount: '',
        coefficient: '',
        dateIssue: null,
        dateMaturity: null,
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

        loans: [],
        role: '',
        focusedInput: null,
    };

    componentDidMount() {
        const {
            location: {
                state,
            },
        } = this.props;

        const { role } = getDataAuthUser();
        const newStateData = {
            role,
        };

        if (state) {
            const { clientId } = state;
            newStateData.clientId = clientId;

            getClient(clientId)
                .then(result => {
                    const { territories } = this.state;
                    const { client } = result;
                    const selectedTerritory = territories.find(e => +e.value === +client.territory);
                    const { name: clientName } = client;

                    this.setState({
                        ...newStateData,
                        ...client,
                        clientName,
                        selectedTerritory,
                    });
                });
        }

        this.setState({ ...newStateData });
    }

    onBack = () => {
        this.props.history.goBack();
    };

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    onCreateClientCard = event => {
        event.preventDefault();

        const {
            email,
            fullName,
            phone,
            selectedTerritory,
            passportData,
            clientId,
            surchargeFactor,
            territories,
        } = this.state;

        const territory = territories.find(e => +e.value === +selectedTerritory.value).value;

        const body = {
            email,
            fullName,
            phone,
            territory,
            passportData,
            clientId,
            surchargeFactor,
        };

        createClientCard(body)
            .then(() => getClientLoans(clientId))
            .then(loans => {
                this.setState({
                    currentStep: 2,
                    loans,
                });
            })
    };

    onCreateLoan = event => {
        event.preventDefault();

        const {
            amount,
            selectedTerritory,
            dateIssue,
            dateMaturity,
            clientId,
            territories,
        } = this.state;

        const territory = territories.find(e => +e.value === +selectedTerritory.value);
        const duration = subtractDates(dateIssue, dateMaturity);
        const totalRepaymentAmount = (amount * territory) + convertToDays(duration);

        const body = {
            amount,
            clientId,
            dateIssue,
            dateMaturity,
            totalRepaymentAmount,
        };

        return saveLoan(body);
    };

    onChangeDates = ({ startDate, endDate }) => {
        this.setState({
            dateIssue: startDate,
            dateMaturity: endDate,
        });
    };

    onFocusedInput = focusedInput => {
        this.setState({
            focusedInput,
        });
    };

    render() {
        const { currentStep } = this.state;
        const CurrentComponent = components[currentStep];

        return (
            <CurrentComponent
                data={this.state}
                onBack={this.onBack}
                onCreateClientCard={this.onCreateClientCard}
                onCreateLoan={this.onCreateLoan}
                onChangeDates={this.onChangeDates}
                onChangeInput={this.onChangeInput}
                onChangeTerritory={this.onChangeTerritory}
                onFocusedInput={this.onFocusedInput}
                validator={this.validator}
            />
        );
    }
}

export default Add;
