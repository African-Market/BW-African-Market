import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';


const RegisterDiv = styled.div`
    

    form{
        background-color: rgba(10, 85, 35, .7);
        border: 1px solid rgba(5,5,5, .5);
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        width: 350px;
        height: 40vh;
        padding: 35px;
        color: white;
    }

    h2 {
        font-size: 3rem;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    .inputs label input {
        width: 59%;
    }

    label {
        display: inline-block;
    }

    .submit {
        height:7vh;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-between;
    }

    button {
        font-size: 2rem;
        width:10vw;
    }

    .error{
        color: crimson;
    }

`

export default function Register (props) {

    const history = useHistory();
   
    const emptyState = () => ({
        business_name: "",
        email: "",
        password: "",
        terms: false,
      });
    
    const [formState, setFormState] = useState(emptyState());

    const [errors, setErrors] = useState({
        business_name: "",
        email: "",
        password: "",
        terms: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)



    const formSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
        axios
            .post("http://localhost:8080/register", formState)
            .then(res => {
                console.log(res)
                setFormState(emptyState())
                history.push(`/profile/${res.data.user.business_name}`)
            })       
            .catch(err => console.log("ERROR", err))
    }


    const formSchema = yup.object().shape({
        business_name: yup
            .string()
            .required("Business name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Must be a valid email address"),
        password: yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters long."),
        terms: yup
            .boolean()
            .oneOf([true], "You must accept Terms and Conditions")
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

    const changeHandler = (e) => {
        e.persist();
        validate(e);
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name] : value})
    }


    return ( 
        <RegisterDiv >
            <form onSubmit={formSubmit}>
                <h2>Register</h2>
                <div className="inputs">
                    <label htmlFor="business_name">Business Name {""}
                        <input name="business_name" id="business_name" type="text" placeholder="Enter your business name" value={formState.business_name} onChange={changeHandler}/>   
                        <p className="error">{errors.business_name}</p>      
                    </label>
                    <label htmlFor="email">Email {""}
                        <input name="email" id="email" type="text" placeholder="Enter your email" value={formState.email} onChange={changeHandler}/>
                        <p className="error">{errors.email}</p>
                    </label>
                    <label htmlFor="password">Password {""}
                        <input name="password" id="password" type="password" placeholder="Enter your passsword" value={formState.password} onChange={changeHandler}/>
                        <p className="error">{errors.password}</p>
                    </label>             
                </div>
                <div className="submit">
                    <label htmlFor="terms">Accept Terms & Conditions
                        <input name="terms" id="terms" type="checkbox"  onChange={changeHandler} />
                    </label>
                    <button disabled={buttonDisabled}>Submit</button>
                </div>            
            </form> 
        </RegisterDiv>
    )
}

