import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import schema from "./schema";

dotenv.config();

const app = express();
const port = process.env.PORT; // default port to listen
const server = new ApolloServer({schema});
server.applyMiddleware({app, path: '/api/graphql'});

app.use(bodyParser.json());
app.use(express.static('../build'));

//This should be coming in as a redirect form the auth server, so
//follow the redirect to get the token, then load the app with that token
app.get("/api/login", (req, res) => {
    console.log("login called", req);
    //If we are in dev mode then we need to redirect to the dev server,
    //otherwise just load the page with the parameter (TODO)
    res.redirect("http://localhost:3000?token=12345");
});

app.post("/api/logout", (req, res) => {
    console.log("logout called");
    res.json({token: ""});
});

app.post("/api/tools", (req, res) => {
    console.log("tools called");
    res.json([{name: "saw"}, { name: "hammer"}]);
});

app.get("/", (req, res) => {
    res.sendFile(path.join("../build/index.html"));
});

const httpServer = createServer(app);
httpServer.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );