import * as express from "express"
import * as bodyParser from "body-parser"
import * as path from "path"
import { ApolloServer } from 'apollo-server-express'
import schema from "./schema";

const app = express()
const SERVER_PORT = 8080
const GRAPHQL_STEM = '/graphql'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const apolloServer = new ApolloServer({
  schema,
  playground: {
      endpoint: GRAPHQL_STEM,
      settings: {
          'editor.theme': 'dark'
      }
  },
  tracing: false,
  cacheControl: false
})

apolloServer.applyMiddleware({
  app,
  path: GRAPHQL_STEM
})

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../../app/build")))

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../app/build", "index.html"))
  })
}

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
