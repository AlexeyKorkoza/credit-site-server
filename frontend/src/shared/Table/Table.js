import styled from 'styled-components';

const Table = styled.div`
  margin: 50px auto;
  background: #27293d;
`;

Table.List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

Table.List.Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #2f3144;
`;

Table.List.Row.Column = styled.div`
  padding: 20px;
  color: #a4a4ac;
  text-align: center;
`;

export default Table;
