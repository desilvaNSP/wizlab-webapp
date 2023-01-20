import { create } from "axios";
import BaseUrls from "../../configs/baseUrls";

const { DOMAIN } = BaseUrls;

export const API = create({
  baseURL: DOMAIN,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const setAuthHeader = token => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// we can also have interceptors in case we need to handle http requests

export default {
  API,
  setAuthHeader
};
