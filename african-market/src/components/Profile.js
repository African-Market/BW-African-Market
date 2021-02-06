import React, { useState } from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const HomeDiv = styled.div`
font-size: 1.5rem;
background-color: rgba(10, 85, 35, .7);
border: 1px solid rgba(5,5,5, .5);
display: flex;
flex-direction: column;
justify-content: center;
width: 350px;
height: 30vh;
padding: 40px;
color: white;

h2{
    font-size: 3rem;
}
h3 {
    font-size: 2rem;
}
`


export default function Profile (props) {

    const [ business, setBusiness ] = useState();

    const params = useParams();

    let businessName = params.id;

    // axios
    //     .get(`https://reqres.in/api/africanmarketplace/`)
    //     .then(res=> console.log(res))


    return (
        <HomeDiv>
            <h2>Profile</h2>
            <h3>Business Name</h3>
            <p>Email</p>
        </HomeDiv>
        
    )
}