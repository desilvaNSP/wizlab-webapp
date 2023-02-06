import { createSlice, current } from '@reduxjs/toolkit'
import { HTTP_STATUS_CODE_401_UNAUTHORIZED, HTTP_STATUS_CODE_403_FORBIDDEN, PAYMENT_SEARCH_ENDPOINT, PAYMENT_SUBMIT_ENDPOINT } from "../../../Configs/ApgConfigs";
import { ServiceEngine } from "../../../Services/ServiceEngine";

export const PaymentServicesSlice = createSlice({
    name: 'payment',
    initialState: {
        FilteredPayments: []
    },
    reducers: {
        UpdateFilteredPayments(state, action) {
            let obj = action.payload;
            return {
                ...state,
                FilteredPayments: obj.studentPaymentHistoryResults
            };
        },
        UpdatePaymentStatus(state, action) {
            var existingPayments = current(state).FilteredPayments
            var obj = action.payload;
            const updatedFilteredPayments = existingPayments.map(x => {
                if (obj.enrollmentId == x.enrollmentId) {
                    return obj
                } else {
                    return x;
                }
            });
            return {
                ...state,
                FilteredPayments: updatedFilteredPayments
            };
        }
    },
})

export const { UpdateFilteredPayments, UpdatePaymentStatus } = PaymentServicesSlice.actions


export const SearchPayments = (paymentSearchPayload, callback) => (dispatch) => {
    ServiceEngine.post(PAYMENT_SEARCH_ENDPOINT, paymentSearchPayload).then(response => {
        //response.data
        dispatch(UpdateFilteredPayments(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    //toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    //toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                //toast.error("Check your internet connection or network connectivity issue between servers");
            }
            //callback(error.response.data, false);
        })
}

export const PaymentSubmit = (paymentSubmitPayload, callback) => (dispatch) => {
    ServiceEngine.post(PAYMENT_SUBMIT_ENDPOINT, paymentSubmitPayload).then(response => {
        var response = response.data.paymentHistoryEntry;
        dispatch(UpdatePaymentStatus(response))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    //toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    //toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                //toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export default PaymentServicesSlice.reducer