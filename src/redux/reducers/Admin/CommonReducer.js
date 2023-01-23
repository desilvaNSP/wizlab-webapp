import * as ACTIONS from "../../Actions/Types"

const initialState = {
    IsLoading: false,
    MetaData: false,
    LoadingMessage: "",
    MerchantStatuses: [],
    NetworkAppInstallationTriggerTypes: [],
    Networks: [],
    TransactionTypes: [],
    TransactionStatuses: [],
    TerminalStatuses: [],
    TerminalLogonTypes: [],
    NetworkAppStatuses: [],
    NetworkTransactionTypeStatuses: [],
    NetworkAppIndentificationDetails: [],
    AppVersions: [],
    ErrorCodes: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SHOW_LOADING:
            return {
                ...state,
                IsLoading: true,
                LoadingMessage: action.message
            };
        case ACTIONS.HIDE_LOADING:
            return {
                ...state,
                IsLoading: false
            };
        case ACTIONS.GET_METADATA:
            return {
                ...state,
                MetaData: true,
                MerchantStatuses: action.payload.merchantStatuses,
                NetworkAppInstallationTriggerTypes: action.payload.networkAppInstallationTriggerTypes,
                Networks: action.payload.networks,
                TransactionTypes: action.payload.transactionTypes,
                TransactionStatuses: action.payload.transactionStatuses,
                TerminalStatuses: action.payload.terminalStatuses,
                TerminalLogonTypes: action.payload.terminalLogonTypes,
                NetworkAppStatuses: action.payload.networkAppStatuses,
                NetworkTransactionTypeStatuses: action.payload.networkTransactionTypeStatuses,
                NetworkAppIndentificationDetails: action.payload.networkAppIndentificationDetails,
                ErrorCodes: action.payload.errorCodes
            };
        case ACTIONS.GET_METADATA_FAILED:
            return {
                ...state,
                MetaData: false,
            };
        case ACTIONS.GET_APPVERSIONS:
            return {
                ...state,
                AppVersions: action.payload
            };
        case ACTIONS.GET_APPVERSIONS_FAILED:
            return {
                ...state
            };
        default:
            return state;
    }
}
