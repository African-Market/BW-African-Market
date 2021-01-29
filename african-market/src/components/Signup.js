import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';

const SignupDiv = styled.div`
    background-color: rgba(10, 85, 35, .7);
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 45vh;
    padding: 40px;
    color: white;

    h2 {
        font-size: 3rem;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        text-align: right;
        justify-content: space-evenly;
        height:100%;
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
        justify-content: space-between;
    }

    button {
        font-size: 2rem;
    }

`


export default function Signup () {

   
    const emptyState = () => ({
        businessName: "",
        email: "",
        password: "",
        terms: false,
      });
    
    const [formState, setFormState] = useState(emptyState());

    const [errors, setErrors] = useState({
        businessName: "",
        email: "",
        password: "",
        terms: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)

 

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
        axios
            .post("https://reqres.in/api/africanmarketplace", )
            .then(res => {
                console.log(formState)
                setFormState(emptyState())
            })
            .catch(err => console.log("ERROR", err))
    }

    const formSchema = yup.object().shape({
        businesName: yup
            .string()
            .required("Business name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Must be a valid email address"),
        password: yup
            .string()
            .required("Password is required")
            .min(6, "Passwords must be at least 6 characters long."),
        terms: yup
            .boolean()
            .oneOf([true], "You must accept Terms and Conditions")
    })

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

    const validate = (e)=> {

  // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
    .reach(formSchema, e.target.name)
    //we can then run validate using the value
    .validate(e.target.value)
    // if the validation is successful, we can clear the error message
    .then(valid => {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setErrors({
        ...errors,
        [e.target.name]: err.errors[0]
      });
    });

  // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
  setFormState({
    ...formState,
    [e.target.name]: e.target.value
  });
    }

     const changeHandler = (e) => {
        e.persist()
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name] : value})
    }


    return ( 
        <SignupDiv className="signUpDiv">
            <form onSubmit={formSubmit}>
                <h2>Sign Up</h2>
                <div className="inputs">
                    <label htmlFor="businessName">Business Name {""}
                        <input name="businessName" id="businessName" type="text" placeholder="Enter your business name" value={formState.businessName} onChange={changeHandler}/>
                    </label>
                    <label htmlFor="email">Email {""}
                        <input name="email" id="email" type="text" placeholder="Enter your email" value={formState.email} onChange={changeHandler}/>
                    </label>
                    <label htmlFor="password">Password {""}
                        <input name="password" id="password" type="text" placeholder="Enter your passsword" value={formState.password} onChange={changeHandler}/>
                    </label>                  
                </div>
                <div className="submit">
                    <label htmlFor="terms">Accept Terms & Conditions
                        <input name="terms" id="terms" type="checkbox"  onChange={changeHandler} />
                    </label>
                    <button disabled={buttonDisabled}>Submit</button>
                </div>            
            </form> 
        </SignupDiv>
        

    )
}

