import * as ACTIONS from "../../Actions/Types"
import * as Constants from "../../../components/transactions/Constants"

const initialState = {
    Errors: {},
    AllTransactionsData: [],
    MannualRefundResponse: {},
    SwishTransactionDetail: [],
    VippsTransactionDetail: [],
    KlarnaTransactionDetail: [],
    TransactionSequence: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.GET_TRANSACTION_DATA:
            return {
                ...state,
                AllTransactionsData: action.payload
            };
        case ACTIONS.GET_TRANSACTION_DATA_FAILED:
            return {
                ...state,
                Errors: action.payload
            };
        case ACTIONS.GET_TRANSACTION_DETAIL:
            if (action.network === Constants.NETWORK_SWISH) {
                return {
                    ...state,
                    SwishTransactionDetail: action.payload
                };
            } else if (action.network === Constants.NETWORK_VIPPS) {
                return {
                    ...state,
                    VippsTransactionDetail: action.payload
                };
            } else if (action.network === Constants.NETWORK_KLARNA) {
                return {
                    ...state,
                    KlarnaTransactionDetail: action.payload
                };
            }
        case ACTIONS.GET_TRANSACTION_DETAIL_FAILED:
            return {
                ...state,
                Errors: action.payload
            };
        case ACTIONS.GET_TRANSACTION_DETAIL:
            if (action.network === Constants.NETWORK_SWISH) {
                return {
                    ...state,
                    SwishTransactionDetail: action.payload
                };
            } else if (action.network === Constants.NETWORK_VIPPS) {
                return {
                    ...state,
                    VippsTransactionDetail: action.payload
                };
            } else if (action.network === Constants.NETWORK_KLARNA) {
                return {
                    ...state,
                    KlarnaTransactionDetail: action.payload
                };
            }
        case ACTIONS.GET_TRANSACTION_DETAIL_FAILED:
            return {
                ...state,
                Errors: action.payload
            };
        case ACTIONS.GET_TRANSACTION_SEQUENCE:
            return {
                ...state,
                TransactionSequence: action.payload
            };
        case ACTIONS.GET_TRANSACTION_SEQUENCEL_FAILED:
            return {
                ...state,
                Errors: action.payload
            };
        case ACTIONS.MANNUAL_REFUND:
            return {
                ...state,
                MannualRefundResponse: action.payload
            };
        case ACTIONS.MANNUAL_REFUND_FAILED:
            return {
                ...state,
                Errors: action.payload
            };
        default:
            return state;
    }
}
