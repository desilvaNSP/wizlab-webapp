import BaseUrls from "../../../configs/baseUrls";
import axios from "axios";
import { AuthUrl } from "../../services/API_Paths";
import cookieHandler from "../../../handlers/cookieHandler";
import { FETCH_TOKEN } from "./authActionTypes";
const querystring = require("querystring");

export const fetchToken = (username, password) => dispatch => {
  const { HYBRIS_CLIENT_ID, HYBRIS_CLIENT_SECRET, COOKIE_DOMAIN } = BaseUrls;
  const payload = {
    client_id: HYBRIS_CLIENT_ID,
    client_secret: HYBRIS_CLIENT_SECRET,
    grant_type: "password",
    username,
    password
  };
  axios
    .post(AuthUrl.OATH_TOKEN_URL, querystring.stringify(payload))
    .then(response => {
      cookieHandler.setCookie(
        "access_token",
        response.data.access_token,
        response.data.expires_in,
        COOKIE_DOMAIN
      );
      var expires_at = new Date();
      expires_at.setSeconds(expires_at.getSeconds() + response.data.expires_in);
      cookieHandler.setCookie("expires_at", expires_at, null, COOKIE_DOMAIN);
      cookieHandler.setCookie(
        "expires_in",
        response.data.expires_in,
        null,
        COOKIE_DOMAIN
      );
      cookieHandler.setCookie(
        "refresh_token",
        response.data.refresh_token,
        null,
        COOKIE_DOMAIN
      );

      dispatch({
        type: FETCH_TOKEN,
        payload: response.data.access_token
      });
    });
};

export const setTokenOnStore = token => dispatch => {
  dispatch({
    type: FETCH_TOKEN,
    payload: token
  });
};
