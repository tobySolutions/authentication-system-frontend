import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

function AuthComponent() {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://nodejs-authorization-app.herokuapp.com/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);


  // logout
  const logOut = () => {
    // destroy the cookie generated on login
    cookies.remove("TOKEN", {path: "/"});
    // redirect user to the landing page
    window.location.href = "/";
  }

  return (
    <div className="text-center">
      <h1>Auth Component</h1>

     {/* displaying our message from our API call */}
      <h3 className="text-danger">{message}</h3>

      {/* logout */}
      <Button type="submit" variant="danger" onClick={() => logOut()}>
        Logout
      </Button>
    </div>
  );
}

export default AuthComponent;
