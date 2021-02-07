import React from 'react';
import styled from 'styled-components';

const HomeDiv = styled.div`
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    height: 60vh;
`

export default function Home () {
    return (
        <HomeDiv>
            <h2>SAUTI AFRICA EMPOWERS SMALL BUSINESS OWNERS, PARTICULARLY WOMEN,<br/>
            TO IMPROVE THEIR BUSINESS AND ECONOMIC OPPORTUNITIES<br/>
            TO GROW OUT OF POVERTY.
            </h2>
        </HomeDiv>
        
    )
}