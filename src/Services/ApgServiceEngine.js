import axios from 'axios'
import { SERVICE_ENDPOINT } from '../Configs/ApgConfigs';

export const ApgServiceEngine = axios.create({
    baseURL: SERVICE_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const SetAuthHeader = (token) => {
    ApgServiceEngine.defaults.headers.common.Authorization =  `Bearer ${token}`;
};

// we can also have interceptors in case we need to handle http requests

export default {
    ApgServiceEngine,
    SetAuthHeader
};