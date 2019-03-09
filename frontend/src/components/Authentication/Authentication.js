import React from 'react';
import ReactSelect from 'react-select';

import { Button, Input, Modal, ModalContent, ModalItem, H1 } from '../../shared';

const Authentication = props => {
    const { isActiveModal } = props;

    return (
        <Modal isActiveModal={isActiveModal}>
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
                    />
                </ModalItem>
                <ModalItem>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password ..."
                        value={props.password}
                        onChange={props.onInputChange}
                    />
                </ModalItem>
                <ModalItem>
                    <ReactSelect
                        value={props.selectedRole}
                        onChange={props.onSelectChange}
                        options={props.roles}
                    />
                </ModalItem>
                <ModalItem>
                    <Button onClick={props.onSubmit}>Log In</Button>
                </ModalItem>
            </ModalContent>
        </Modal>
    );
};

export default Authentication;
