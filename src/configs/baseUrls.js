let URL,
  HYBRIS_CLIENT_ID,
  HYBRIS_CLIENT_SECRET,
  COOKIE_DOMAIN,
  MANAGER_PORTAL_BASE_END_POINT,
  FILM_MASTER_BASE_END_POINT,
  FILM_SCHEDULER_BASE_END_POINT,
  FILM_CONTRACTS_BASE_END_POINT = "";

switch (process.env.REACT_APP_SERVER_TYPE) {
  case "dev":
    URL = "https://cinemaswebservices-dev.savantis.cloud:9002";
    HYBRIS_CLIENT_ID = "managerportal_client";
    HYBRIS_CLIENT_SECRET = "Consnet01";
    COOKIE_DOMAIN = ".savantis.cloud";
    MANAGER_PORTAL_BASE_END_POINT =
      "https://arcdevmanagerportal.savantis.cloud";
    FILM_MASTER_BASE_END_POINT = "https://arcdevfilmmaster.savantis.cloud";
    FILM_SCHEDULER_BASE_END_POINT =
      "https://arcdevfilmscheduler.savantis.cloud";
    FILM_CONTRACTS_BASE_END_POINT = "https://arcdevfilmcontract.savantis.cloud";
    break;
  case "qa":
    URL = "https://cinemaswebservices-qas.savantis.cloud:9002";
    HYBRIS_CLIENT_ID = "managerportal_client";
    HYBRIS_CLIENT_SECRET = "Consnet01";
    COOKIE_DOMAIN = ".savantis.cloud";
    MANAGER_PORTAL_BASE_END_POINT =
      "https://arcqasmanagerportal.savantis.cloud";
    FILM_MASTER_BASE_END_POINT = "https://arcqafilmmaster.savantis.cloud";
    FILM_SCHEDULER_BASE_END_POINT = "https://arcqafilmscheduler.savantis.cloud";
    FILM_CONTRACTS_BASE_END_POINT = "https://arcqafilmcontract.savantis.cloud";
    break;
  case "prod":
    URL = "https://cinemaswebservices.savantis.cloud:9002";
    HYBRIS_CLIENT_ID = "filmmaster_client";
    HYBRIS_CLIENT_SECRET = "Kb7f$5S%9b";
    COOKIE_DOMAIN = ".savantis.cloud";
    MANAGER_PORTAL_BASE_END_POINT =
      "https://arclightcinemamanager.savantis.cloud";
    FILM_MASTER_BASE_END_POINT = "https://arcprodfilmmaster.savantis.cloud";
    FILM_SCHEDULER_BASE_END_POINT =
      "https://arcprodfilmscheduler.savantis.cloud";
    FILM_CONTRACTS_BASE_END_POINT =
      "https://arcprodfilmcontract.savantis.cloud";
    break;
  case "local":
    URL = "https://cinemaswebservices-dev.savantis.cloud:9002";
    HYBRIS_CLIENT_ID = "managerportal_client";
    HYBRIS_CLIENT_SECRET = "Consnet01";
    COOKIE_DOMAIN = "localhost";
    MANAGER_PORTAL_BASE_END_POINT = "http://localhost:4200";
    FILM_MASTER_BASE_END_POINT = "http://localhost:3000";
    FILM_SCHEDULER_BASE_END_POINT = "http://localhost:3001";
    FILM_CONTRACTS_BASE_END_POINT = "http://localhost:3002";
    break;
  default:
    URL = "https://cinemaswebservices-dev.savantis.cloud:9002";
    HYBRIS_CLIENT_ID = "managerportal_client";
    HYBRIS_CLIENT_SECRET = "Consnet01";
    COOKIE_DOMAIN = ".savantis.cloud";
    MANAGER_PORTAL_BASE_END_POINT =
      "https://arcdevmanagerportal.savantis.cloud";
    FILM_MASTER_BASE_END_POINT = "https://arcstgfilmmaster.savantis.cloud";
    FILM_SCHEDULER_BASE_END_POINT =
      "https://arcdevfilmscheduler.savantis.cloud";
    FILM_CONTRACTS_BASE_END_POINT = "https://arcdevfilmcontract.savantis.cloud";
    break;
}

const DOMAIN = URL;
const OAUTH_TOKEN_URL = `${DOMAIN}/authorizationserver/oauth/token`;
const HYBRIS_USER_PROFILE_URL = `${DOMAIN}/cinemawebservices/auth/login`;

export default {
  DOMAIN,
  OAUTH_TOKEN_URL,
  HYBRIS_USER_PROFILE_URL,
  HYBRIS_CLIENT_ID,
  HYBRIS_CLIENT_SECRET,
  COOKIE_DOMAIN,
  MANAGER_PORTAL_BASE_END_POINT,
  FILM_MASTER_BASE_END_POINT,
  FILM_SCHEDULER_BASE_END_POINT,
  FILM_CONTRACTS_BASE_END_POINT
};
