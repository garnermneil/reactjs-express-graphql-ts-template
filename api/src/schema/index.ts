import { makeExecutableSchema } from "graphql-tools";
import { merge } from 'lodash'
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'

const rootSchema = [
    `
    scalar DateTime
    scalar Date

    type Hello {
        message: String
        when: DateTime
    }

    type Query {
        hello(name: String): Hello
    }
`
]

const hello = (parent, {name}) => {
    return { message: `Hello ${name}` }
}

const when = (parent, {name}) => {
    return new Date()
}

const rootResolver = {
    DateTime: GraphQLDateTime,
    Date: GraphQLDate,
    Query: {
        hello
    },
    Hello: {
        when
    }
}

const typeDefs = [
    ...rootSchema
]

const resolvers = merge(
    rootResolver
)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema