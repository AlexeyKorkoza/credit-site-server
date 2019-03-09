import styled from 'styled-components';

const Modal = styled.div`
    display: ${props => props.isActiveModal ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    overflow: auto;
    background-color: #1e1e2e;
    `;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    background-color: #212941;
    margin: 15% auto;
    padding: 20px;
    width: 30%;
    height: 300px;
    border-radius: 5px;
    `;

const ModalItem = styled.div`
    display: block;
`;

export {
    Modal,
    ModalContent,
    ModalItem,
};
