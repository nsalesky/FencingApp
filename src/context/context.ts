import React from "react";

/**
 * The global application context containing values that will be useful across the entire application.
 * `Email` contains the currently-logged in user's unique email address.
 */
export default React.createContext({
  email: "",
  setEmail: (newEmail: string) => {},
});
