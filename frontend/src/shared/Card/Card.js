import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #3F4357;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 1px 20px 0 rgba(0,0,0,.1);
    border: none;
    border-radius: .2857rem;
    `;

Card.List = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

Card.Item = styled.div`
  display: flex;
  align-items: baseline;
  margin: 5px 0;
`;

Card.Item.Label = styled.label`
  color: grey;
  margin-right: 10px;
`;

export default Card;