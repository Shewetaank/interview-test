import React from 'react'
import '../index.css';
import styled from 'styled-components';

const StyledH3 = styled.h3`
    margin: 10px 15px;
    padding-top: 8px;
    font-size: x-large;
`;

const StyledHeader = styled.header`
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
`;

export default function Header() {
    return (
        <StyledHeader>
            <img src='http://localhost:3000/logo.svg' alt='logo' />
            <StyledH3>Planned test</StyledH3>
        </StyledHeader>
    )
}