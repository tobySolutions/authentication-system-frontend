import React, { createContext } from "react";
import {Navigate} from "react-router-dom";
import Cookies from "universal-cookie";

export const ProtectedContext = createContext(null);

const cookies = new Cookies();

// receives component and any other props represented by ...rest
function ProtectedRoutes({ children }) {
  // get cookie from browser if logged in
  const token = cookies.get("TOKEN");

  // returns route if there is a valid token set in the cookie
  if (token) {
    return (
      <ProtectedContext.Provider value={{ token }}>
        {children}
      </ProtectedContext.Provider>
    );
  } else {
    // returns the user to the landing page if there is no valid token set
    return (
      <Navigate
        to={{
          pathname: "/",
        //   state: {
        //     // sets the location a user was about to access before being redirected to login
        //     from: props.location,
        //   },
        }}
      />
    );
  }
}

export default ProtectedRoutes;
