import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';



import { Button, Input, Modal, ModalContainer, ModalContent, ModalItem, H1 } from '../../shared';

const Authentication = props => {
    const { isActiveModal, validator } = props;

    return (
        <Modal isActiveModal={isActiveModal}>
            <ModalContainer>
                <ModalContent>
                    <ModalItem>
                        <H1>Log in credit site system</H1>
                    </ModalItem>
                    <ModalItem>
                        <Input
                            name="login"
                            value={props.login}
                            placeholder="Login ..."
                            onChange={props.onInputChange}
                            required
                        />
                        {validator.message('login', props.login, 'required')}
                    </ModalItem>
                    <ModalItem>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password ..."
                            value={props.password}
                            onChange={props.onInputChange}
                            required
                        />
                        {/* @TODO Check password length (min 8 symbols) */}
                        {validator.message('password', props.password, 'required')}
                    </ModalItem>
                    <ModalItem>
                        <ReactSelect
                            value={props.selectedRole}
                            onChange={props.onSelectChange}
                            options={props.roles}
                            placeholder={'Select Role ...'}
                        />
                        {validator.message('role', props.selectedRole, 'required')}
                    </ModalItem>
                    <ModalItem>
                        <Button onClick={props.onSubmit}>Log In</Button>
                    </ModalItem>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

Authentication.defaultProps = {
    login: '',
    password: '',
    selectedRole: {},
    roles: [],
    isActiveModal: false,
    onInputChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSubmit: PropTypes.func,
    validator: PropTypes.shape(),
};

Authentication.propTypes = {
    login: PropTypes.string,
    password: PropTypes.string,
    selectedRole: PropTypes.shape(),
    roles: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })
    ),
    isActiveModal: PropTypes.bool,
    onInputChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSubmit: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Authentication;
