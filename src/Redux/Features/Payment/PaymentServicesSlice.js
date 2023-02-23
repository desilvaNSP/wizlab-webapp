import { toast } from 'react-toastify';
import { createSlice, current } from '@reduxjs/toolkit'
import { ServiceEngine } from "../../../Services/ServiceEngine";
import { 
    ERROR_MESSAGE_401_UNAUTHORIZED, 
    ERROR_MESSAGE_403_FORBIDDEN, 
    HTTP_STATUS_CODE_401_UNAUTHORIZED, 
    HTTP_STATUS_CODE_403_FORBIDDEN, 
    HTTP_STATUS_CODE_404_NOT_FOUND, 
    PAYMENT_SEARCH_ENDPOINT, 
    PAYMENT_UPDATE_ENDPOINT} from "../../../Configs/ApgConfigs";


export const PaymentServicesSlice = createSlice({
    name: 'payment',
    initialState: {
        FilteredPayments: {}
    },
    reducers: {
        UpdateFilteredPayments(state, action) {
            let obj = action.payload;
            return {
                ...state,
                FilteredPayments: obj
            };
        },
        UpdatePaymentStatus(state, action) {
            var filterPayments = current(state).FilteredPayments;
            var existingPayments = filterPayments?.studentPaymentHistoryResults
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
                FilteredPayments: {
                    totalNumberOfEntries: existingPayments.totalNumberOfEntries,
                    studentPaymentHistoryResults:updatedFilteredPayments
                }
                
            };
        }
    },
})

export const { UpdateFilteredPayments, UpdatePaymentStatus } = PaymentServicesSlice.actions

export const SearchPayments = (paymentSearchPayload, callback) => (dispatch) => {
    ServiceEngine.post(PAYMENT_SEARCH_ENDPOINT, paymentSearchPayload).then(response => {
        dispatch(UpdateFilteredPayments(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else if (HTTP_STATUS_CODE_404_NOT_FOUND === error.response.status) {
                    dispatch(UpdateFilteredPayments(error.response.data))
                    toast.warning("Payment records are not found for selected criteria")
                }else {
                    toast.error("Get payments failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const PaymentUpdate = (paymentSubmitPayload, callback) => (dispatch) => {
    ServiceEngine.put(PAYMENT_UPDATE_ENDPOINT, paymentSubmitPayload).then(response => {
        var response = response.data.paymentHistoryEntry;
        dispatch(UpdatePaymentStatus(response))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else {
                    toast.error("Payment update failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export default PaymentServicesSlice.reducer