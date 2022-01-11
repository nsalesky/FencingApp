import React, { PropsWithChildren } from "react";
import context from "./context";

/**
 * Wraps around a given number of React components to provide them with the `context` global state.
 * @param props the children components to provide global context to
 * @returns the rendered global state component
 */
const GlobalState = (props: PropsWithChildren<{}>) => {
  const [email, setEmail] = React.useState("");

  return (
    <context.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default GlobalState;
