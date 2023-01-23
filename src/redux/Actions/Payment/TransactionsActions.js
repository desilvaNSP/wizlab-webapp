import * as ACTIONS from "../Types";
import { ApgServiceEngine, SetAuthHeader } from "../../../Services/Helpers/ApgServiceEngine"
import { toast } from "react-toastify";
import {
    TRANSACTIONS_ENDPOINT,
    TRANSACTION_DETAILS_ENDPOINT,
    TRANSACTION_SEQUENCE_BYREF_ENDPOINT,
    MANNUAL_REFUND_ENDPOINT,
    HTTP_STATUS_CODE_401_UNAUTHORIZED,
    HTTP_STATUS_CODE_403_FORBIDDEN,
    ERROR_MESSAGE_401_UNAUTHORIZED,
    ERROR_MESSAGE_403_FORBIDDEN
} from '../../../ApgConfigs';


export const getTransactionDataByFilterCriteria = (payload, token) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving transactions"
        });
        ApgServiceEngine.post(TRANSACTIONS_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.GET_TRANSACTION_DATA,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Retrieved transactions successfully");
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
                            type: ACTIONS.GET_TRANSACTION_DATA_FAILED,
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

export const getTransactionDetailsByRefId = (trxnRefId, networkId, timeZone, token) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving transaction detail"
        });
        ApgServiceEngine.get(TRANSACTION_DETAILS_ENDPOINT + "?transactionId=" + trxnRefId + "&networkId=" + networkId + "&timeZoneId=" + timeZone).then(res => {
            dispatch({
                type: ACTIONS.GET_TRANSACTION_DETAIL,
                payload: res.data,
                network: networkId
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Retrieved transaction detail successfully");
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
                            type: ACTIONS.GET_TRANSACTION_DETAIL_FAILED,
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


export const postMannualRefund = (payload, token, callback) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Creating manual refund"
        });
        ApgServiceEngine.post(MANNUAL_REFUND_ENDPOINT, payload).then(res => {
            dispatch({
                type: ACTIONS.MANNUAL_REFUND,
                payload: res.data
            });
            toast.success("Transaction refunded successfully");
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
                            type: ACTIONS.MANNUAL_REFUND_FAILED,
                            payload: error.response.data
                        });
                        toast.error("Manual refund failed with " + error.response.data.errorCode + "-" + error.response.data.status);
                    }
                    dispatch({
                        type: ACTIONS.HIDE_LOADING
                    });
                } else {
                    toast.error("Check your internet connection or network connectivity issue between servers");
                }
                callback(false);
            })
    };
};

export const getSequenceOfTransactionByTransactionId = (trxnRefId, timeZone, token) => {
    SetAuthHeader(token);
    return (dispatch, getState) => {
        dispatch({
            type: ACTIONS.SHOW_LOADING,
            message: "Retrieving sequence of transaction by transaction reference"
        });
        ApgServiceEngine.get(TRANSACTION_SEQUENCE_BYREF_ENDPOINT + "?trxnRef=" + trxnRefId + "&timeZoneId=" + timeZone).then(res => {
            dispatch({
                type: ACTIONS.GET_TRANSACTION_SEQUENCE,
                payload: res.data
            });
            dispatch({
                type: ACTIONS.HIDE_LOADING
            });
            toast.success("Retrieved transaction detail successfully");
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
                            type: ACTIONS.GET_TRANSACTION_SEQUENCEL_FAILED,
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