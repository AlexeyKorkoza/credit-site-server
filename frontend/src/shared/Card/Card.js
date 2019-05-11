import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: #3F4357;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 1px 20px 0 rgba(0,0,0,.1);
    border: none;
    border-radius: .2857rem;
    `;

Card.Item = styled.div`
  display: flex;
`;

Card.Item.Label = styled.label`
  color: grey;
`;

export default Card;
