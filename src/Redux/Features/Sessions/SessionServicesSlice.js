import { createSlice, current } from '@reduxjs/toolkit'
import update from 'react-addons-update';
import { ServiceEngine } from "../../../Services/ServiceEngine";
import { 
    CREATE_SESSION_ENDPOINT,
    ERROR_MESSAGE_401_UNAUTHORIZED,
    ERROR_MESSAGE_403_FORBIDDEN,
    GET_ALL_SESSIONS_ENDPOINT,
    GET_SESSIONS_BY_CLASSID_ENDPOINT,
    HTTP_STATUS_CODE_401_UNAUTHORIZED, 
    HTTP_STATUS_CODE_403_FORBIDDEN,
    HTTP_STATUS_CODE_404_NOT_FOUND
 } from "../../../Configs/ApgConfigs";
import { toast } from 'react-toastify';


export const SessionServicesSlice = createSlice({
    name: 'sessions',
    initialState: {
        Sessions: []
    },
    reducers: {
        SetAllSessions: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Sessions:{
                    sessions: obj.sessions,
                    totalNumberOfEntries: obj.totalNumberOfEntries
                }
            };
        },
        UpdateSessions: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Sessions:{ 
                    sessions: obj?.sessions,
                    totalNumberOfEntries: obj?.totalNumberOfEntries
                }, 
            };
        },
        AddNewSession: (state, action) => {
            let obj = action.payload;
            var sessionsState = current(state).Sessions;
            return {
                ...state,
                Sessions:{
                    sessions: [...sessionsState?.sessions, obj],
                    totalNumberOfEntries: sessionsState?.totalNumberOfEntries + 1
                }, 
            };
        },
    },
})

export const { SetAllSessions, UpdateSessions, AddNewSession } = SessionServicesSlice.actions

export const CreateSession = (sessionPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_SESSION_ENDPOINT, sessionPayload).then(response => {
        //response.data
        dispatch(AddNewSession(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Creating session failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const GetSessionByClassId = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_SESSIONS_BY_CLASSID_ENDPOINT, payload).then(response => {
        callback(response.data, true);
        dispatch(SetAllSessions(response.data))
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Get sessions by class failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const GetSessions = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_ALL_SESSIONS_ENDPOINT, payload).then(response => {
        dispatch(SetAllSessions(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else if (HTTP_STATUS_CODE_404_NOT_FOUND === error.response.status) {
                    toast.warning("Sessions are not found for selected criteria")
                }else {
                    toast.error("Get sessions failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}



export default SessionServicesSlice.reducer