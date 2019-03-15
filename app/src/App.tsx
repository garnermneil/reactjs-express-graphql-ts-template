import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import { Greeting } from './components/Greeting'

declare global {
  interface Window {
      APOLLO_STATE: any
  }
}

const connectionOptions = {
  uri: '/graphql'
}
const httpLink = new HttpLink(connectionOptions)
const batchHttpLink = new BatchHttpLink(connectionOptions)

const client = new ApolloClient({
  link: split(operation => operation.getContext().important === true, httpLink, batchHttpLink),
  cache: new InMemoryCache().restore(window.APOLLO_STATE)
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Greeting client={client} name="Neil"/>
      </div>
    );
  }
}

export default App;
