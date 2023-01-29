## Run project in Locally.

- Open command prompt

- set "REACT_APP_SERVER_TYPE=Local" && npm start

## Configuration changes based on the Enviornment

Goto ApgConfigs.js and do the environment specific configuration.

`    case "Development":
        APG_ADMIN_LISTENER = "https://apg-webportal-dev.westpay.se";
        CLIENT_ID = "0f133a0d-5e4a-4fd0-a132-fa3569d799df";
        AUTHORITY = "https://login.microsoftonline.com/04413ff0-8d01-4fcc-99e1-a79171aeada0"
        REDIRECT_URI = "https://apg-admin-dev.westpay.se/"
        SCOPES = "api://7c9af769-e2d6-4d9e-af0c-d2ecb7fc67f2/Apis.All"
        break;
`