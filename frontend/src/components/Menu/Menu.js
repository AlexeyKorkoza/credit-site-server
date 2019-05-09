import React from 'react';
import { Link } from 'react-router-dom';

import Menu from './styles';
import { Profile } from './icons';

const menuItems = [
    {
        link: '/clients',
        label: 'Clients',
    },
    {
        link: '/loans',
        label: 'Loans',
    },
    {
        link: '/managers',
        label: 'Managers',
        role: 'admin',
    },
];

const dropdownItems = [
    {
        link: '/profile',
        label: 'Profile',
    },
    {
        link: '/logout',
        label: 'Log Out',
    },
];

export default props => {
    return (
        <Menu>
            <Menu.List>
                <Menu.Navigation>
                {menuItems.map((item, index) => {
                    if (props.role === item.role) {
                        return (
                            <Menu.Navigation.Item>
                                <Link key={index} to={item.link}>{item.label}</Link>
                            </Menu.Navigation.Item>
                        );
                    }

                    return (
                        <Menu.Navigation.Item>
                            <Link key={index} to={item.link}>{item.label}</Link>
                        </Menu.Navigation.Item>
                    );
                })}
                </Menu.Navigation>
                <Menu.Dropdown>
                    <Profile onClick={props.onClickDropdown} />
                    {props && props.isActiveDropDown
                        ? (
                            <Menu.Dropdown.List>
                                {dropdownItems.map((item, index) => {
                                    return (
                                        <Menu.Dropdown.Item>
                                            <Link key={index} to={item.link}>{item.label}</Link>
                                        </Menu.Dropdown.Item>
                                    );
                                })}
                            </Menu.Dropdown.List>
                        )
                        :
                        null
                    }
                </Menu.Dropdown>
            </Menu.List>
        </Menu>
    );
}
