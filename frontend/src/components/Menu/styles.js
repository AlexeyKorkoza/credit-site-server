import styled from 'styled-components';

const Menu = styled.div`
  width: 100%;
  background-color: rgb(36, 41, 46);
`;

Menu.List = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
`;

Menu.Navigation = styled.div`
  display: flex;
`;

Menu.Navigation.Item = styled.div`
  padding: 20px 15px;
  
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

Menu.Dropdown = styled.div`
`;

Menu.Dropdown.List = styled.div`
  display: flex;
  flex-direction: column;
`;

Menu.Dropdown.Item = styled.div`
  color: red;
`;

export default Menu;
