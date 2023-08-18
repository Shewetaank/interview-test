import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    padding: 60px 270px;
    padding-bottom: 0px;
`;

const StyledH1 = styled.h1`
    font-size: xx-large;
`;

export default function PageTitle() {
    return (
        <StyledDiv>
            <StyledH1>Users</StyledH1>
        </StyledDiv>
    )
}