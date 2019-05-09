import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Menu from './Menu';

import { getDataAuthUser } from '../services/localDb';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthUser: true,
            isActiveDropDown: false,
        };
    }

    componentDidMount() {
        const data = getDataAuthUser();

        if (!data) {
            this.updateUserState(false);
        }
    }

    updateUserState(isAuthUser) {
        this.setState({
            isAuthUser,
        });
    }

    onClickDropdown() {
        const { isActiveDropDown } = this.state;

        this.setState({
            isActiveDropDown: !!isActiveDropDown,
        })
    }

    render() {
        const { isAuthUser, isActiveDropDown } = this.state;

        if (!isAuthUser) {
            return <Redirect to={'/auth'} />;
        }

        const { role } = getDataAuthUser();

        return (
            <div>
                <Menu
                  role={role}
                  onClickDropdown={this.onClickDropdown}
                  isActiveDropDown={isActiveDropDown}
                />
            </div>
        );
    }
}

export default App;
