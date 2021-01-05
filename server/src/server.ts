import express, { query } from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import schema from "./schema";
import axios from "axios";
import qs from "qs";
import { createBuilderStatusReporter } from "typescript";

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
    if(!!req.query.code) {
    console.log("login called", req.query.code);
    const requestBody = {
        code: req.query.code,
        grant_type: "authorization_code",
        client_id: "makeropsdev",
        redirect_uri: "http://localhost:3080/api/login"
    }
    const authString = Buffer.from(`makeropsdev:${process.env.AUTH_SECRET}`).toString("base64");
    axios.post("https://oauth.wildapricot.org/auth/token", qs.stringify(requestBody),
        {headers: { Authorization: `Basic ${authString}`, 
            contentType: "application/x-www-form-urlencoded"}})
    .then((tokenResponse) => {
        res.redirect(`http://localhost:3000?token=${tokenResponse.data.access_token}`);
    })
    .catch((e) => {
        console.error("Error requesting token from auth server ", e);
    });
    //If we are in dev mode then we need to redirect to the dev server,
    //otherwise just load the page with the parameter (TODO)
    } else {
        console.error("No code present on login request");
        res.redirect("http://localhst:3000?error=login");
    }
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