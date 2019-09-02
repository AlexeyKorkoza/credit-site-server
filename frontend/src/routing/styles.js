import styled, { createGlobalStyle } from 'styled-components';

const Page = styled.div`
  display: flex;
  background: #6B5B95;
  margin-left: 70px;
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  
  body {
    margin: 0;
    background: #6B5B95;
  }
`;

export {
    GlobalStyle,
    Page,
};
