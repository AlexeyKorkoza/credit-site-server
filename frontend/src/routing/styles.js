import styled, { createGlobalStyle } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Page = styled.div`
  display: flex;
  width: 100%;
  background: #6B5B95;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export {
    GlobalStyle,
    Page,
    Wrapper,
};
