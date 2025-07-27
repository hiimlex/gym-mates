import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { BackendIp } from "@models/generic";

export const client = new ApolloClient({
  uri: `${BackendIp}/graphql`,
  cache: new InMemoryCache(),
});
