*Makerspace Operations Application*

This web application supports makerspace operations, focused on tool inventory, management, maintenance, training tracking.

Full stack web application:
* Database built using Liquibase assuming a PostGRESQL database
* Server built using NodeJS with a GraphQL API interface
* Web application build using Typescript, React, Redux, SASS

Assumes user management and accounts are handled by the Wild Apricot system.  Performs single sign on to the
Association Site hosted on Wild Apricot.  Uses Wild Apricot APIs to get and maintain list of users.

Built to support Makersmiths in Northern Virginia http://www.makersmiths.org


# Developer Notes
These instructions assume a Linux or MacOS platform (might work in a Windows Ubuntu shell?).
Requires Docker, docker-compse, postgresql client (psql), NodeJS, NPM, (Liquibase)[https://www.liquibase.org/]

Run all components locally during development: PostgreSQL database, Node server, React client.

## Setup
Clone the repo.  At the project root run `npm install`.  This is mostly to keep Visual Studio Code happy, installing the required version of Typescript.  Make sure Visual Studio Code is set to use the Workspace typescript version (open a typescript file, click the version number on the bottom status bar, and set to use
workspace version).

Run `npm install` again in both the server and client folders, this will install the dependencies specific to those components.

## Security
The application authenticates against the Single Sign On server, in this case using Wild Apricot.  Follow the instructions on the providers site to set up the external application.  For the development client make sure a redirect to http://localhost:3000.  Recommend a separate client definition for deployment with a redirect to the
deployed application URL.

## Running Database
`docker-compose.yml` in the home folder is set up to run the database and migrations to build the database.  The compose is set up to store the database in a persistent volument (`pg_data`) to preserve between runs. 

From a terminal in the project root run
`docker-compose up -d`
to start the database. Connect to the database from command line
`psql -h localhost -U makerops -d makerops` or use your favorite database tool.

## Server
See the (server readme)[./server/README.md]

## Client
Assumes that the server will be running on port 3080.  If that changes then update the proxy
target in package.json.  Run the server using `npm run dev` in the server folder, then run
the client using `npm start` in the project root folder.

Created using the create-react-app project, see that project for details.

# Deploying
If needed, run the database migration to update the database.  Build the client application and deploy the server and the client/build folder to the production environment.

Build the client application by running 
`npm run build`
In the root folder.  

On the production server copy the `build` and `server` folders from the project.  To start the application go to the `server` folder and `npm start`.