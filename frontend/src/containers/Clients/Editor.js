import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';

import { Editor as EditorComponent } from '../../components/Clients';
import {
    deleteClient,
    getClient,
    markClientForDeletion,
    saveClient,
} from '../../api/clients';
import { getDataAuthUser } from '../../services/localDb';
import buildNotification from "../../services/notification";

class Editor extends Component {
    notificationDOMRef = React.createRef();
    timer = null;
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
        failureNotificationType: 'FailureEditingClient',
        successfulNotificationType: 'SuccessfulEditingClient',
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

    componentWillUnmount() {
        clearTimeout(this.timer);
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

      const {
          clientId,
          failureNotificationType,
          successfulNotificationType,
      } = this.state;

      return deleteClient(clientId)
          .then(() => {
              const message = 'Client was deleted successfully';
              const notification = buildNotification(message, successfulNotificationType);
              if (notification) {
                  this.notificationDOMRef.current.addNotification(notification);
              }
              this.timer = setTimeout(() => {
                  this.props.history.push('/clients');
              }, 3000);
          })
          .catch(error => {
              const { message } = error;
              const notification = buildNotification(message, failureNotificationType);
              if (notification) {
                  this.notificationDOMRef.current.addNotification(notification);
              }
          });
    };

    onMarkClientForDeletion = event => {
        event.preventDefault();

        const {
            clientId,
            failureNotificationType,
            successfulNotificationType,
        } = this.state;

        return markClientForDeletion(clientId)
            .then(() => {
                const message = 'Client was deleted successfully';
                const notification = buildNotification(message, successfulNotificationType);
                if (notification) {
                    this.notificationDOMRef.current.addNotification(notification);
                }
            })
            .catch(error => {
                const { message } = error;
                const notification = buildNotification(message, failureNotificationType);
                if (notification) {
                    this.notificationDOMRef.current.addNotification(notification);
                }
            });
    };

    onSave = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            return;
        }

        const {
            action,
            email,
            failureNotificationType,
            name,
            clientId,
            passportData,
            phone,
            role,
            selectedTerritory,
            successfulNotificationType,
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

        const func =  action === 'edit'
            ? saveClient(body, +clientId)
            : saveClient(body);

        return func
            .then(() => {
                const message = action === 'edit'
                    ? 'Client was updated successfully'
                    : 'Client was created successfully';
                const notification = buildNotification(message, successfulNotificationType);
                if (notification) {
                    this.notificationDOMRef.current.addNotification(notification);
                }
                this.timer = setTimeout(() => {
                    this.props.history.push('/clients');
                }, 3000);
            })
            .catch(error => {
                const { message } = error;
                const notification = buildNotification(message, failureNotificationType);
                if (notification) {
                    this.notificationDOMRef.current.addNotification(notification);
                }
            });
    };

    render() {
        return (
            <Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <EditorComponent
                    data={this.state}
                    onChangeInput={this.onChangeInput}
                    onChangeTerritory={this.onChangeTerritory}
                    onDeleteClient={this.onDeleteClient}
                    onMarkClientForDeletion={this.onMarkClientForDeletion}
                    onSave={this.onSave}
                    validator={this.validator}
                />
            </Fragment>
        );
    }
}

export default withRouter(Editor);
