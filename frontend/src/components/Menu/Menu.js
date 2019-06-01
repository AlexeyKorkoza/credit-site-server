import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from './styles';
import {
    Client,
    Loan,
    Logout,
    Manager,
    Profile,
} from './icons';

const menuItems = [
    {
        link: '/clients',
        label: 'Clients',
        icon: Client,
    },
    {
        link: '/loans',
        label: 'Loans',
        icon: Loan,
    },
    {
        link: '/managers',
        label: 'Managers',
        role: 'admin',
        icon: Manager,
    },
];

const dropdownItems = [
    {
        link: '/profile',
        label: 'Profile',
        icon: Profile,
    },
];

const MenuComponent = props => {
    const {
        onLogOut,
    } = props;

    return (
        <Menu>
            <Menu.List>
                <Menu.Navigation>
                    {menuItems.map((item, index) => {
                        const { icon: Icon } = item;
                        if (props.role === item.role) {
                            return (
                                <Menu.Navigation.Item>
                                    <Link key={index} to={item.link}>
                                        <Icon />
                                    </Link>
                                </Menu.Navigation.Item>
                            );
                        }

                        return (
                            <Menu.Navigation.Item>
                                <Link key={index} to={item.link}>
                                    <Icon />
                                </Link>
                            </Menu.Navigation.Item>
                        );
                    })}
                </Menu.Navigation>
                <Menu.Dropdown>
                    {dropdownItems.map((item, index) => {
                        const { icon: Icon } = item;

                        return (
                            <Menu.Dropdown.Item>
                                <Link key={index} to={item.link}>
                                    <Icon />
                                </Link>
                            </Menu.Dropdown.Item>
                        );
                    })}
                    <Menu.Dropdown.Item>
                        <Link onClick={onLogOut}>
                            <Logout />
                        </Link>
                    </Menu.Dropdown.Item>
                </Menu.Dropdown>
            </Menu.List>
        </Menu>
    );
};

MenuComponent.defaultProps = {
    onLogOut: PropTypes.func,
};

MenuComponent.propTypes = {
    onLogOut: PropTypes.func,
};

export default MenuComponent;
