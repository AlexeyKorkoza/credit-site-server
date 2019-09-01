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
        roles: ['admin', 'manager'],
    },
    {
        link: '/loans',
        label: 'Loans',
        icon: Loan,
        roles: ['admin'],
    },
    {
        link: '/managers',
        label: 'Managers',
        icon: Manager,
        roles: ['admin'],
    },
    {
        link: '/profile',
        label: 'Profile',
        icon: Profile,
        roles: ['admin', 'manager'],
    },
];

const MenuComponent = props => {
    const {
        onLogOut,
        role,
    } = props;

    return (
        <Menu>
            <Menu.Container>
                <Menu.Navigation>
                    {menuItems.map((item, index) => {
                        const { icon: Icon, roles } = item;
                        const isAccess = roles.includes(role);

                        if (isAccess) {
                            return (
                                <Menu.Navigation.Item>
                                    <Link key={index} to={item.link}>
                                        <Icon />
                                    </Link>
                                </Menu.Navigation.Item>
                            );
                        }
                    })}
                    <Menu.Navigation.Item onClick={onLogOut}>
                        <Logout />
                    </Menu.Navigation.Item>
                </Menu.Navigation>
            </Menu.Container>
        </Menu>
    );
};

MenuComponent.defaultProps = {
    onLogOut: PropTypes.func,
    role: PropTypes.string,
};

MenuComponent.propTypes = {
    onLogOut: PropTypes.func,
    role: PropTypes.string,
};

export default MenuComponent;
