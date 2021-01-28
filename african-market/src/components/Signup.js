import React from 'react';
import styled from 'styled-components'

export default function Signup () {

    const SignupDiv = styled.div`
        background-color: #11923c;
        display: flex;
        flex-direction: column;
        width: 300px;
        padding: 50px 70px;
        border: 3px solid grey;
        color: white;

        .inputs {
            display: flex;
            flex-direction: column;
            text-align: right;
        }
     
    `

    return ( 
        <SignupDiv>
            <h2>Sign Up</h2>
            <div className="inputs">
                <label>Business Name {""}
                    <input />
                </label>
                <label>Email {""}
                    <input />
                </label>
                <label>Password {""}
                    <input />
                </label>
            </div>
            
        </SignupDiv>
        

    )
}