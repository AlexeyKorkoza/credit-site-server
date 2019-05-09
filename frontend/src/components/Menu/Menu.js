import React from 'react';
import { Link } from 'react-router-dom';

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
    {
        link: '/logout',
        label: 'Log Out',
        icon: Logout,
    },
];

export default props => {
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
                </Menu.Dropdown>
            </Menu.List>
        </Menu>
    );
}
