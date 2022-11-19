import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies();


function Login() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);


    const handleSubmit = (e) => {
      // to prevent the form from refreshing the whole page
      e.preventDefault();

      //set configurations
      const configuration = {
        method: "post",
        url: "https://nodejs-authorization-app.herokuapp.com/login",
        data: {
          email,
          password,
        },
      };

      // make the API call
      axios(configuration)
        .then((result) => {
         setLogin(true);
        
         // set the cookie
         cookies.set("TOKEN", result.data.token, {
          path: "/"
         })

         // redirect user to the auth page
         window.location.href = "/auth";
        })
        .catch((error) => {
           error = new Error();
        });
    }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          name="email"
          value={email}
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email" 
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          name="password"
          value={password}
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" 
          />
        </Form.Group>

        {/* submit button */}
        <Button 
        onClick={(e) => handleSubmit(e)}
        variant="primary" 
        type="submit">
          Login
        </Button>
        
        {/* display success message */}
        {
            login ? (
                <p className="text-success">You are logged in successfully</p>
            ) : 
            (
                <p className="text-danger">You are not logged in</p>
            )
        }

      </Form>
    </>
  );
}

export default Login;
