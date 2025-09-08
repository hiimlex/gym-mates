import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { BackendIp } from "@models/generic";
import { defaultDataIdFromObject } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${BackendIp}/graphql`,
  cache: new InMemoryCache(),
});
