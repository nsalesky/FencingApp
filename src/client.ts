import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BACKEND_SERVER_URI } from "@env";
import { getLoginInfo } from "./auth";

// The basic HTTP link to the backend server
const httpLink = createHttpLink({
  uri: BACKEND_SERVER_URI,
});

// Incorporates authentication information stored in local storage into every GraphQL request
// if it exists, so that all requests will be authenticated
const authLink = setContext(async (_, { headers }) => {
  return getLoginInfo().then((loginInfo) => {
    return {
      headers: {
        ...headers,
        authorization: loginInfo ? loginInfo.token : "",
      },
    };
  });
});

/**
 * The Apollo GraphQL client connected to the backend server through an authentication link.
 */
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
