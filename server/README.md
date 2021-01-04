
# Setup
Create a server/.env file with the following variables, adjust the values as needed.  This file is not under source control to keep from exposing the secret key for authentication.  Obtain the secret key from the authentication provider (Wild Apricot) for the external app configuration.

```
NODE_ENV=development

SERVER_PORT=3000
AUTH_URL=https://oauth.wildapricot.org/auth/token
AUTH_CLIENT_ID=makeropsdev
AUTH_CLIENT_SECRET=keygoeshere
SESSION_SECRET=SomeStringForStoringSessionLocally
```