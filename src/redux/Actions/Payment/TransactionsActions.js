import * as ACTIONS from "../Types";
import { ApgServiceEngine, SetAuthHeader } from "../../../Services/Helpers/ApgServiceEngine"
import { toast } from "react-toastify";
import {
    TRANSACTIONS_ENDPOINT,
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
