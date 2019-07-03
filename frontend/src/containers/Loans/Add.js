import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { getClient, getClientLoans } from "../../api/clients";
import { createClientCard } from "../../api/client_card";
import Steps from '../../components/Loans/Add';

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

        loans: [],
    };

    componentDidMount() {
        const {
            location: {
                state,
            },
        } = this.props;

        if (state) {
            const { clientId } = state;

            this.setState({ clientId });
        }
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

    onCreateClientCard = () => {
        // const
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

        const territory = territories.find(e => +e.value === +selectedTerritory.value);

        const body = {
            email,
            fullName,
            phone,
            territory,
            passportData,
            clientId,
            surchargeFactor,
        };

        let client;

        createClientCard(body)
            .then(() => getClient(clientId))
            .then(result => {
                client = result;

                return getClientLoans(clientId);
            })
            .then(loans => {
                const { name: clientName } = client;

                this.setState({
                    clientName,
                    currentStep: 2,
                    loans,
                });
            })
    };

    render() {
        const { currentStep } = this.state;
        const currentComponent = components[currentStep];

        return (
            <currentComponent
                data={this.state}
                onBack={this.onBack}
                onCreateClientCard={this.onCreateClientCard}
                onChangeInput={this.onChangeInput}
                onChangeTerritory={this.onChangeTerritory}
                validator={this.validator}
            />
        );
    }
}

export default Add;
