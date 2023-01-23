import * as ACTIONS from "../Types";
import { ApgServiceEngine, SetAuthHeader } from "../../../Services/Helpers/ApgServiceEngine"
import { toast } from "react-toastify";
import {
    MERCHANT_CUD_ENDPOINT,
    MERCHANT_NETWORK_PROFILE_R_ENDPOINT,
    HTTP_STATUS_CODE_401_UNAUTHORIZED,
    HTTP_STATUS_CODE_403_FORBIDDEN,
    ERROR_MESSAGE_401_UNAUTHORIZED,
    ERROR_MESSAGE_403_FORBIDDEN,
    MERCHANT_NETWORK_PROFILE_CUD_ENDPOINT,
    MERCHANT_NETWORK_TRANSACTION_TYPE_CUD_ENDPOINT,
    MERCHANT_ALL_ENDPOINT
} from '../../../ApgConfigs';


export const getAllMerchants = (token, loadingLock=true) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving All Merchants"
        });
        ApgServiceEngine.get(MERCHANT_ALL_ENDPOINT).then(res => {
            dispatch({
                type: ACTIONS.GET_ALL_MERCHANTS,
                payload: res.data
            });
            if(loadingLock){
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
            }
            toast.success("Retrieved all merchants successfully");
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
                            type: ACTIONS.GET_ALL_MERCHANTS_FAILED,
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

export const createMerchant = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Creating merchants"
        });
        ApgServiceEngine.post(MERCHANT_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.CREATE_MERCHANTS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Merchants are created succesfully");
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
                            type: ACTIONS.CREATE_MERCHANTS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Creating merchants failed with "  + error.response.data.message + " - " + error.response.status);
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

export const updateMerchants = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Updating merchants"
        });
        ApgServiceEngine.put(MERCHANT_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.UPDATE_MERCHANTS,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Merchants are updated succesfully");
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
                            type: ACTIONS.UPDATE_MERCHANTS_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Updating merchants failed with "  + error.response.data.message + " - " + error.response.status);
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

export const getMerchantNetworksAndTransactionTypes = (merchantId, token) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving merchant network profiles"
        });
        ApgServiceEngine.get(MERCHANT_NETWORK_PROFILE_R_ENDPOINT + "?merchantId=" + merchantId).then(res => {
            dispatch({
                type: ACTIONS.GET_ALL_MERCHANT_NETWORK_PROFILES,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Retrieved merchant network profiles successfully");
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
                            type: ACTIONS.GET_ALL_MERCHANT_NETWORK_PROFILES_FAILED,
                            payload: error.response.data
                        });
                    }
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                dispatch({
                    type: ACTIONS.HIDE_LOADING
                });
            });
    };
};

export const associateMerchantNetworkProfiles = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Associating merchant network profile"
        });
        ApgServiceEngine.post(MERCHANT_NETWORK_PROFILE_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Network profile are associated in succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        toast.error("Associating network profile failed with "  + error.response.data.message + " - " + error.response.status);
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

export const updateAssociateMerchantNetworkProfiles = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Updating merchant network profile"
        });
        ApgServiceEngine.put(MERCHANT_NETWORK_PROFILE_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Network profile are updated succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        toast.error("Updating network profile failed with "  + error.response.data.message + " - " + error.response.status);
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



export const associateTransactionTypes = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Enable transaction type for merchant network profile"
        });
        ApgServiceEngine.post(MERCHANT_NETWORK_TRANSACTION_TYPE_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Enable transaction type are assigned in succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        toast.error("Enable transaction type failed with "  + error.response.data.message + " - " + error.response.status);
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


export const updatedAssociatedTransactionTypes = (payload, id, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Enable transaction type for merchant network profile"
        });
        ApgServiceEngine.defaults.headers.common.merchantNetworkTransactionTypesId = id;
        ApgServiceEngine.put(MERCHANT_NETWORK_TRANSACTION_TYPE_CUD_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Enable transaction type are assigned in succesfully");
            callback(true, res.data);
        }).catch(
            error => {
                if (error.response !== undefined) {
                    if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                        toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                    } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                        toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                    } else {
                        toast.error("Enable transaction type failed with "  + error.response.data.message + " - " + error.response.status);
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

export const deleteMerchantNetworkProfile = (merchantNetworkProfileId, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Deleting merchant network profile"
        });
        ApgServiceEngine.defaults.headers.common.profileId =  merchantNetworkProfileId;
        ApgServiceEngine.delete(MERCHANT_NETWORK_PROFILE_CUD_ENDPOINT).then(res => {
            dispatch({
                type: ACTIONS.DELETE_MERCHANT_NETWORK_PROFILE,
                payload: merchantNetworkProfileId
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Merchant network profile is deleted succesfully");
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
                            type: ACTIONS.DELETE_MERCHANT_NETWORK_PROFILE_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Deleting merchant network profile failed with "  + error.response.data.message + " - " + error.response.status);
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
