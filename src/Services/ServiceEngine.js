import axios from 'axios';
import { SERVICE_ENDPOINT } from '../Configs/ApgConfigs';

export const ServiceEngine = axios.create({
    baseURL: SERVICE_ENDPOINT,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const SetAuthHeader = (token, instituteId) => {
    console.log("instituteId", instituteId)
    ServiceEngine.defaults.headers.common.Authorization =  `Bearer ${token}`;
    ServiceEngine.defaults.headers.common.InstituteId =  instituteId;
};

// we can also have interceptors in case we need to handle http requests

export default {
    ServiceEngine,
    SetAuthHeader
};