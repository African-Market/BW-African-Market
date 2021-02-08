import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import * as yup from "yup";

const LoginDiv = styled.div`
  form {
    background-color: rgba(10, 85, 35, 0.7);
    border: 1px solid rgba(5, 5, 5, 0.5);
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
    width: 100%;
  }

  h2 {
    font-size: 3rem;
    color: white;
  }

  button {
    font-size: 2rem;
    width: 10vw;
  }

  input {
    width: 60%;
  }

  .error {
    color: crimson;
  }
`;

export default function Login() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    invalidLogin: false,
    invalidLoginError: "",
  });

  const changeHandler = (e) => {
    e.persist();
    validate(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    console.log("submitted");
    axios
      .post("http://localhost:8080/login", formState)
      .then((res) => {
        console.log(res);
        history.push(`/profile/${res.data.user.business_name}`);
      })
      .catch((err) => {
        console.log(err);
        setErrors({ ...errors, invalidLogin: true });
      });
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Provide a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    invalidLogin: yup.boolean().oneOf([true], "Invalid Login"),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formSchema, formState]);

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        if (e.target.name === "invalidLogin") {
          setErrors({ ...errors, invalidLoginError: err.errors[0] });
        } else {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0],
          });
        }
        console.log(errors);
      });
  };

  return (
    <LoginDiv>
      <form onSubmit={formSubmit}>
        <h2>Login</h2>
        <div className="inputs">
          <label htmlFor="email">
            Email {""}
            <input
              name="email"
              id="email"
              type="text"
              value={formState.email}
              onChange={changeHandler}
            />
            <br />
            <p className="error">{errors.email}</p>
          </label>
          <label htmlFor="password">
            Password {""}
            <input
              name="password"
              id="password"
              type="password"
              value={formState.password}
              onChange={changeHandler}
            />
            <br />
            <p className="error">{errors.password}</p>
          </label>
        </div>
        {errors.invalidLogin ? <p className="error">Invalid Login</p> : null}
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </LoginDiv>
  );
}
