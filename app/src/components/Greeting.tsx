import React, { Fragment } from "react"
import gql from "graphql-tag"
import { Query } from 'react-apollo'

const GET_GREETING = gql`
query Greeting($name: String!) {
    hello(name: $name) {
        message
    }
}
`
type MessageProps ={
    name: string
    client: any
}

const Greeting = (props: MessageProps) => (
    <Query client={props.client} query={GET_GREETING} variables={{name: props.name}}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading ...'
        if (error) return `Error ... ${error}`
  
        return (
          <div>
              <p>Response is '{data.hello.message}'</p>
          </div>      
      );
      }}
    </Query>
  )
  export { Greeting }