let CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net"

switch (process.env.REACT_APP_SERVER_TYPE) {
  case "Development":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
  case "UAT":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-uat.azurewebsites.net";
    break;
  case "Production":
    CLASSROOM_ADMIN_LISTENER = "https://classroom-be-dev-as.azurewebsites.net";
    break;
  case "Local":
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
//institute
export const CREATE_INSTITUTE_ENDPOINT = '/api/v1/admin/institute'
export const GET_INSTITUTE_ENDPOINT = '/api/v1/admin/institute'
//portal users
export const CREATE_USER_ENDPOINT = '/api/v1/admin/user'
//courses
export const CREATE_COURSE_ENDPOINT = '/api/v1/admin/course'
export const GET_COURSE_BYID_ENDPOINT = '/api/v1/admin/courseinfo'
export const ADD_NEWLEVELS_AND_SUBJECTS_ENDPOINT = '/api/v1/admin/cource/addlevel' //POST
export const CREATE_SUBJECTS_ENDPOINT = '/api/v1/admin/subject' //POST
export const UPDATE_SUBJECTS_BY_ID_ENDPOINT = '/api/v1/admin/subject' //PUT
export const DELETE_SUBJECT_ENDPOINT = '/api/v1/admin/subject' //DELETE
export const DELETE_LEVEL_ENDPOINT = '/api/v1/admin/level' // DELETE
//classes
export const CREATE_CLASS_ENDPOINT = '/api/v1/admin/class'
export const UPDATE_CLASS_ENDPOINT = '/api/v1/admin/class'
export const DELETE_CLASS_ENDPOINT = '/api/v1/admin/class'
export const GET_CLASSES_ENDPOINT  = '/api/v1/admin/classes/search'
//classrooms
export const CREATE_CLASSROOM_ENDPOINT = '/api/v1/admin/classroom'
export const UPDATE_CLASSROOM_ENDPOINT = '/api/v1/admin/classroom'
export const DELETE_CLASSROOM_ENDPOINT = '/api/v1/admin/classroom'
//sessions
export const CREATE_SESSION_ENDPOINT = '/api/v1/admin/session'
export const UPDATE_SESSION_ENDPOINT = '/api/v1/admin/session'
export const DELETE_SESSION_ENDPOINT = '/api/v1/admin/session'
export const GET_SESSIONS_BY_CLASSID_ENDPOINT = '/api/v1/admin/sessionByClassId'
export const GET_ALL_SESSIONS_ENDPOINT = '/api/v1/admin/sessions/search'
//student's enrollments
export const GET_ENROLLMENTS_BY_CLASSID_ENDPOINT = '/api/v1/admin/class/enrollments'
export const UPDATE_ENROLLMENT_ENDPOINT = '/api/v1/admin/enrollment'
export const GET_ALL_STUDENTS_ENDPOINT = '/api/v1/admin/enrollments/search'
//payments
export const PAYMENT_UPDATE_ENDPOINT = '/api/v1/payment/update'
export const PAYMENT_SEARCH_ENDPOINT = '/api/v1/payment/search'
//teachers
export const CREATE_TEACHER_ENDPOINT = '/api/v1/admin/teacher'
export const UPDATE_TEACHER_ENDPOINT = '/api/v1/admin/teacher'
export const GET_TEACHERS_ENDPOINT = '/api/v1/admin/teachers/search'