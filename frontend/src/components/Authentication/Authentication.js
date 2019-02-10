import React from 'react';
import ReactSelect from 'react-select';

import { Button, Input, Modal, ModalContent } from '../../shared';

const Authentication = props => {
    return (
        <Modal>
            <ModalContent>
                <Input value={props.login} onChange={props.onChange} />
                <Input value={props.password} onChange={props.onChange} />
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
