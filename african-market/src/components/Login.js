import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';


const LoginDiv = styled.div`
    form{
        background-color: rgba(10, 85, 35, .7);
        border: 1px solid rgba(5,5,5, .5);
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 350px;
        height: 30vh;
        padding: 40px;
        color: white;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        height: 15vh;
        justify-content: space-evenly;
        text-align: right;
        width:100%;
    }

    h2{
        font-size: 3rem;
        color:white;  
    }

    button {
        font-size: 2rem;     
        width: 10vw;
    }

    input{
        width: 60%;
    }

    .error{
        color: crimson;
    }
`


export default function Login () {
    const [formState, setFormState ] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const changeHandler = e => {
        e.persist();
        validate(e);
        setFormState({...formState, [e.target.name]: e.target.value})
    }

    const formSubmit = (e) => {
        e.preventDefault();

        console.log("submitted")
        axios   
            .post("https://africanmarketplaceapinodejs.herokuapp.com/login")
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const formSchema = yup.object().shape({
        email: yup
        .string()
        .required("Email is required")
        .email("Provide a valid email address"),
        password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long")
    })

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formSchema, formState]);

      const validate = (e)=> {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                ...errors,
                [e.target.name]: ""
             });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                [   e.target.name]: err.errors[0]
                });
            });
    }

    return (
        <LoginDiv>
            <form onSubmit={formSubmit}>  
                <h2>Login</h2>
                <div className="inputs">
                    <label htmlFor="email">Email {""}
                        <input name="email" id="email" type="text" value={formState.email} onChange={changeHandler} />
                        <br />
                        <p className="error">{errors.email}</p>
                    </label>
                    <label htmlFor="password">Password {""}
                        <input name="password" id="password" type="password" value={formState.password} onChange={changeHandler} />
                       <br /> 
                       <p className="error">{errors.password}</p>
                    </label>      
                </div> 
                <button disabled={buttonDisabled}>Submit</button>  
            </form>
        </LoginDiv>
        
    )
}