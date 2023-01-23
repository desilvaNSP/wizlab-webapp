import * as ACTIONS from "../Types";
import { ApgServiceEngine, SetAuthHeader } from "../../../Services/Helpers/ApgServiceEngine"
import { toast } from "react-toastify";
import {
    TERMINAL_CUD_ENDPOINT,
    HTTP_STATUS_CODE_401_UNAUTHORIZED,
    HTTP_STATUS_CODE_403_FORBIDDEN,
    ERROR_MESSAGE_401_UNAUTHORIZED,
    ERROR_MESSAGE_403_FORBIDDEN,
    TERMINAL_NETWORKS_CUD_ENDPOINT,
    TERMINAL_NETWORKS_R_ENDPOINT,
    TERMINAL_ALL_ENDPOINT,
    TERMINAL_BULK_CREATION_ENDPOINT
} from '../../../ApgConfigs';

export const getAllTerminals = (token, loadingLock=true) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving All Terminals"
        });
        ApgServiceEngine.get(TERMINAL_ALL_ENDPOINT).then(res => {
            dispatch({
                type: ACTIONS.GET_ALL_TERMINALS,
                payload: res.data
            });
            if(loadingLock){
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
            }
            toast.success("Retrieved all terminals successfully");
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
                            type: ACTIONS.GET_ALL_TERMINALS_FAILED,
                            payload: error.response.data
                        });
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                if(loadingLock){
                    dispatch({
                        type: ACTIONS.HIDE_LOADING
                    });
                }
            });
    };
};

export const createTerminal = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Creating Terminals"
        });
        ApgServiceEngine.post(TERMINAL_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.CREATE_TERMINALS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Terminal created succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        dispatch({
                            type: ACTIONS.CREATE_TERMINALS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Creating merchants failed with " + error.response.data.message + " - " + error.response.status);
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
                callback(false, null);
            })
    };
};

export const createTerminalBulk = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Creating Terminals"
        });
        ApgServiceEngine.post(TERMINAL_BULK_CREATION_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.CREATE_TERMINALS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Terminals are created succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        dispatch({
                            type: ACTIONS.CREATE_TERMINALS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Creating merchants failed with " + error.response.data.message + " - " + error.response.status);
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
                callback(false, null);
            })
    };
};

export const updateTerminals = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Updating terminals"
        });
        ApgServiceEngine.put(TERMINAL_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.UPDATE_TERMINALS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Terminals are updated succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        dispatch({
                            type: ACTIONS.UPDATE_TERMINALS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Updating terminals failed with " + error.response.data.message + " - " + error.response.status);
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
                callback(false, null);
            })
    };
};

export const getTerminalNetworkByTerminalId = (token, terminalId) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving terminal networks"
        });
        ApgServiceEngine.get(TERMINAL_NETWORKS_R_ENDPOINT + "?terminalId=" + terminalId).then(res => {
            dispatch({
                type: ACTIONS.GET_ALL_TERMINAL_NETWORKS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Retrieved terminal networks successfully");
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
                            type: ACTIONS.GET_ALL_TERMINAL_NETWORKS_FAILED,
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


export const createTerminalNetwork = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Creating Terminal Networks"
        });
        ApgServiceEngine.post(TERMINAL_NETWORKS_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.CREATE_TERMINAL_NETWORKS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Terminal Networks are created succesfully");
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
                            type: ACTIONS.CREATE_TERMINAL_NETWORKS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Creating terminal networks failed with "  + error.response.data.message + " - " + error.response.status);
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

export const updateTerminalNetworks = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Updating terminal networks"
        });
        ApgServiceEngine.put(TERMINAL_NETWORKS_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.UPDATE_TERMINAL_NETWORKS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Terminal networks are updated succesfully");
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
                            type: ACTIONS.UPDATE_TERMINAL_NETWORKS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Updating terminal networks failed with "+ error.response.data.message + " - " + error.response.status);
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


export const deleteTerminalNetwork = (terminalNetworkId, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Deleting terminal network"
        });
        ApgServiceEngine.defaults.headers.common.terminalNetworkId =  terminalNetworkId;
        ApgServiceEngine.delete(TERMINAL_NETWORKS_CUD_ENDPOINT).then(res => {
            dispatch({
                type: ACTIONS.DELETE_TERMINAL_NETWORKS,
                payload: terminalNetworkId
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Terminal network is deleted succesfully");
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
                            type: ACTIONS.DELETE_TERMINAL_NETWORKS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Deleting terminal network failed with " + error.response.data.message + " - " + error.response.status);
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