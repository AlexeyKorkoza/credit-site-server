import styled from 'styled-components';

const Menu = styled.div`
  width: 90px;
  background-color: #3F4357;
`;

Menu.Container = styled.div`
  position: fixed;
`;

Menu.Navigation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

Menu.Navigation.Item = styled.div`
  padding: 10px;
`;

export default Menu;
