import React from 'react';
import ReactSelect from 'react-select';

import { Button, Input, Modal, ModalContent, ModalItem } from '../../shared';

const Authentication = props => {
    const { isActiveModal } = props;

    return (
        <Modal isActiveModal={isActiveModal}>
            <ModalContent>
                <ModalItem>
                    <Input
                        name="login"
                        value={props.login}
                        onChange={props.onInputChange}
                    />
                </ModalItem>
                <ModalItem>
                    <Input
                        type="password"
                        name="password"
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
