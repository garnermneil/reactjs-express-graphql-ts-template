import * as express from "express"
import * as bodyParser from "body-parser"
import * as path from "path"

const app = express()
const SERVER_PORT = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../../app/build")))

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../app/build", "index.html"))
  })
}

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
