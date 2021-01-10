import React from "react"
import ApolloClient from "apollo-client"; // N.B. only needed for the enquiry mutation
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import GqlBoatBrowser from '../../../components/GqlBoatBrowser';

const defaultState = {
  page: 1,
  boatsPerPage: '12', 
  sortField: 'editors_choice', 
  sortDirection: 'asc',
  filters: { sale: false }, 
};

const client = new ApolloClient({
    link: createHttpLink({
      uri: "https://api-oga.herokuapp.com/v1/graphql",
    }),
    cache: new InMemoryCache()
});

export default function BrowseTheRegisterPage() {  
  return (
    <ApolloProvider client={client}>
      <GqlBoatBrowser title="Browse the Register" defaultState={defaultState}/>;
    </ApolloProvider>
  );
}