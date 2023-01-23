import * as ACTIONS from "../Types";
import { ApgServiceEngine, SetAuthHeader } from "../../../Services/Helpers/ApgServiceEngine"
import { toast } from "react-toastify";
import {
    NETWORK_APPVERSION_R_ENDPOINT,
    NETWORK_APPVERSION_CUD_ENDPOINT,
    HTTP_STATUS_CODE_401_UNAUTHORIZED,
    HTTP_STATUS_CODE_403_FORBIDDEN,
    ERROR_MESSAGE_401_UNAUTHORIZED,
    ERROR_MESSAGE_403_FORBIDDEN,
    METADATA_ENDPOINT
} from '../../../ApgConfigs';


export const showLoading = (message) => {
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: message
        });
    }
}

export const hideLoading = () => {
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.HIDE_LOADING
        });
    }
}

export const getMetaData = (token) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        ApgServiceEngine.get(METADATA_ENDPOINT).then(res => {
            dispatch({
                type: ACTIONS.GET_METADATA,
                payload: res.data
            });
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        toast.error("Failed : " + error.response.data.message);
                        dispatch({
                            type: ACTIONS.GET_METADATA_FAILED,
                            payload: error.response.data
                        });
                    }
                }
            })
    };
};


export const getAllAppVersions = (token) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving App Versions"
        });
        ApgServiceEngine.get(NETWORK_APPVERSION_R_ENDPOINT).then(res => {
            dispatch({
                type: ACTIONS.GET_APPVERSIONS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Retrieved App Versions successfully");
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        toast.error("Failed : " + error.response.data.message);
                        dispatch({
                            type: ACTIONS.GET_APPVERSIONS_FAILED,
                            payload: error.response.data
                        });
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
            })
    };
};


export const createAppVersion = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Creating App Versions"
        });
        ApgServiceEngine.post(NETWORK_APPVERSION_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.CREATE_APPVERSIONS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("App versions are created succesfully");
            callback(true);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        dispatch({
                            type: ACTIONS.CREATE_APPVERSIONS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Creating app versions failed with " + error.response.data.message + " - " + error.response.status);
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
                callback(false);
            })
    };
};

export const updateAppVersions = (payload, appVersionId, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Updating app versions"
        });
        ApgServiceEngine.defaults.headers.common.networkAppVersionId =  appVersionId;
        ApgServiceEngine.put(NETWORK_APPVERSION_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.UPDATE_APPVERSIONS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("App versions are updated succesfully");
            callback(true);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        dispatch({
                            type: ACTIONS.UPDATE_APPVERSIONS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Updating app versions failed with "  + error.response.data.message + " - " + error.response.status);
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
                callback(false);
            })
    };
};
