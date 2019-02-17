import React from 'react';
import ReactSelect from 'react-select';

import { Button, Input, Modal, ModalContent } from '../../shared';

const Authentication = props => {
    return (
        <Modal>
            <ModalContent>
                <Input
                    name="login"
                    value={props.login}
                    onChange={props.onInputChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={props.password}
                    onChange={props.onInputChange}
                />
                <ReactSelect
                    value={props.selectedRole}
                    onChange={props.onSelectChange}
                    options={props.roles}
                />
                <Button onClick={props.onSubmit}>Log In</Button>
            </ModalContent>
        </Modal>
    );
};

export default Authentication;
