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

export const ERROR_MESSAGE_401_UNAUTHORIZED = 'You have provided invalid credentials. Please try again';
export const ERROR_MESSAGE_403_FORBIDDEN = 'You are not authorized to perform this operation. Please contact the system administrator to request permission';

//Admin Services
export const FETCH_TOKEN_ENDPOINT = '/api/v1/admin/user/login';
export const METADATA_ENDPOINT = '/api/v1/admin/metadata'
export const CREATE_COURSE_ENDPOINT = '/api/v1/admin/course'
export const CREATE_TEACHER_ENDPOINT = '/api/v1/admin/teacher'
export const CREATE_CLASS_ENDPOINT = '/api/v1/admin/class'
export const CREATE_CLASSROOM_ENDPOINT = '/api/v1/admin/classroom'
export const CREATE_SESSION_ENDPOINT = '/api/v1/admin/session'

export const PAYMENT_SUBMIT_ENDPOINT = '/api/v1/payment/submit'
export const PAYMENT_SEARCH_ENDPOINT = '/api/v1/payment/search'