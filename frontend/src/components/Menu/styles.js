import styled from 'styled-components';

const Menu = styled.div`
  width: 70px;
  background-color: #3F4357;
`;

Menu.List = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

Menu.Navigation = styled(Menu.List)`
`;

Menu.Navigation.Item = styled.div`
  padding: 10px;
  
  a {
    color: #fff;
    font-size: 21px;
    line-height: 1.5px;
    outline: none;
    text-decoration: none;
    
    &:hover {
      outline: none;
      color: #808080;
    }
  }
`;

Menu.Dropdown = styled(Menu.List)`
  justify-content: flex-end;
`;

Menu.Dropdown.Item = styled.div`
  padding: 10px;
`;

export default Menu;
