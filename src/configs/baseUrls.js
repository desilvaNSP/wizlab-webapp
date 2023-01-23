let CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net"

switch (process.env.REACT_APP_SERVER_TYPE) {
  case "dev":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
  case "qa":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
  case "prod":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
  case "local":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
  default:
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
}

export const SERVICE_ENDPOINT = CLASSROOM_ADMIN_LISTENER;


//Error Codes
export const HTTP_STATUS_CODE_200_OK = 200;
export const HTTP_STATUS_CODE_201_CREATED = 201;
export const HTTP_STATUS_CODE_204_NO_CONTENT_SUCCESS = 204;
export const HTTP_STATUS_CODE_400_BAD_REQUEST = 400;
export const HTTP_STATUS_CODE_403_FORBIDDEN = 403;
export const HTTP_STATUS_CODE_401_UNAUTHORIZED = 401;
export const HTTP_STATUS_CODE_404_NOT_FOUND = 404;
export const HTTP_STATUS_CODE_409_CONFLICT = 409;
export const HTTP_STATUS_CODE_422_UNPROCESSABLE_ENTITY = 422;
export const HTTP_STATUS_CODE_429_TOOMANYREQ = 429;
export const HTTP_STATUS_CODE_415_UN_SUPPORTED_MEDIA_TYPE = 415;
export const HTTP_STATUS_CODE_500_INTERNAL_SERVER_ERROR = 500;
export const HTTP_STATUS_CODE_503_SERVICE_UNAVAILABLE = 503;
export const HTTP_STATUS_CODE_504_GATEWAY_TIMEOUT = 504;