import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';

import { Editor as EditorComponent } from '../../components/Clients';
import {
    deleteClient,
    getClient,
    markClientForDeletion,
    saveClient,
} from '../../api/clients';
import { getDataAuthUser } from '../../services/localDb';

class Editor extends Component {
    validator = new SimpleReactValidator();

    state = {
        action: '',
        clientId: null,
        email: '',
        isRemoved: null,
        name: '',
        passportData: '',
        phone: '',
        role: '',
        selectedTerritory: {},
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
    };

    componentDidMount() {
        const {
            match: {
                params,
            },
        } = this.props;

        const { role } = getDataAuthUser();

        if (Object.keys(params).length > 0) {
            const { id: clientId } = params;

            getClient(clientId)
                .then(result => {
                    const { client } = result;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === +client.territory);

                    this.setState({
                        ...client,
                        action: 'edit',
                        clientId,
                        role,
                        selectedTerritory,
                    });
                })
        } else {
            this.setState({
                action: 'add',
                role,
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

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    onDeleteClient = event => {
      event.preventDefault();

      const { clientId } = this.state;

      return deleteClient(clientId)
          .then(() => {
              this.props.history.push('/clients');
          })
    };

    onMarkClientForDeletion = event => {
        event.preventDefault();

        const { clientId } = this.state;

        return markClientForDeletion(clientId);
    };

    onSave = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            return;
        }

        const {
            action,
            email,
            name,
            clientId,
            passportData,
            phone,
            role,
            selectedTerritory,
        } = this.state;

        let body = {
            name,
            passportData,
            phone,
            email,
        };

        if (role === 'admin' && action === 'edit') {
            const { value: territory } = selectedTerritory;

            body.territory = territory;
        }

        if (role === 'manager' && action === 'add') {
            const { value: territory } = selectedTerritory;

            body.territory = territory;
        }

        return action === 'edit'
            ? saveClient(body, +clientId)
            : saveClient(body)
                .then(() => {
                    this.props.history.push('/clients');
                });
    };

    render() {
        return (
          <EditorComponent
            data={this.state}
            onChangeInput={this.onChangeInput}
            onChangeTerritory={this.onChangeTerritory}
            onDeleteClient={this.onDeleteClient}
            onMarkClientForDeletion={this.onMarkClientForDeletion}
            onSave={this.onSave}
            validator={this.validator}
          />
        );
    }
}

export default withRouter(Editor);
