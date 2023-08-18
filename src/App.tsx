import React from 'react';
import Header from './components/Header';
import PageTitle from './components/PageTitle';
import UsersForm from './components/UsersForm';
import styled from 'styled-components';
import UsersData from './components/UsersData';

const API_URL = 'http://localhost:8099';

const StyledBody = styled.body`
  background-color: #F2F2F2;
  height: 100%;
  margin: 0%;
`;

const StyledInnerDiv = styled.div`
  display: flex;
  height: 100%;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <StyledBody>
        <PageTitle />
        <StyledInnerDiv>
          <UsersForm />
        </StyledInnerDiv>
      </StyledBody>
    </div>
  )
}

export default App;
