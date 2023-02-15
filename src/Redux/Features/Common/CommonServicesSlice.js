import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { ServiceEngine } from "../../../Services/ServiceEngine";
import { 
    METADATA_ENDPOINT, 
    CREATE_COURSE_ENDPOINT, 
    HTTP_STATUS_CODE_401_UNAUTHORIZED, 
    HTTP_STATUS_CODE_403_FORBIDDEN, 
    CREATE_CLASS_ENDPOINT, 
    CREATE_CLASSROOM_ENDPOINT, 
    CREATE_SESSION_ENDPOINT, 
    GET_SESSIONS_BY_CLASSID_ENDPOINT, 
    UPDATE_CLASS_ENDPOINT, 
    ERROR_MESSAGE_401_UNAUTHORIZED, 
    ERROR_MESSAGE_403_FORBIDDEN, 
    GET_ALL_SESSIONS_ENDPOINT,
    CREATE_TEACHER_ENDPOINT,
    UPDATE_TEACHER_ENDPOINT} from "../../../Configs/ApgConfigs";

export const CommonServicesSlice = createSlice({
    name: 'common',
    initialState: {
        ClassRooms: [],
        Classes: [],
        Courses: [],
        InstituteId: "",
        Location: "",
        InstituteName: "",
        Teachers: [],
        Users: [],
        PaymentStatus: [],
        UserRoles: [],
        IsLoading: false,
        LoadingMessage: ""
    },
    reducers: {
        ShowLoading: (state, action) => {
            return {
                ...state,
                IsLoading: true,
                LoadingMessage: action.payload
            };
        },
        HideLoading: (state, action) => {
            return {
                ...state,
                IsLoading: false,
                LoadingMessage: ""
            };
        },
        UpdateMetaData: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                ClassRooms: obj.institute?.classRooms,
                Classes: obj.institute?.classes,
                Courses: obj.institute?.courses,
                InstituteId: obj.institute?.id,
                Location: obj.institute?.location,
                InstituteName: obj.institute?.name,
                Teachers: obj.institute?.teachers,
                Users: obj.institute?.users,
                PaymentStatus: obj.paymentStatuses,
                UserRoles: obj.userRoles
            };
        },
        AddNewCourse: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Courses: [...state.Courses, obj]
            };
        },
        AddNewClass: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Classes: [...state.Classes, obj.classobj]
            };
        },
        AddNewTeacher: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Teachers: [...state.Teachers, obj.classobj]
            };
        }
    },
})

export const { ShowLoading, HideLoading, UpdateMetaData, AddNewCourse, AddNewClass, AddNewTeacher } = CommonServicesSlice.actions


export const StartLoading = (message) => (dispatch) => {
    dispatch(ShowLoading(message))
}

export const StopLoading = () => (dispatch) => {
    dispatch(HideLoading())
}

export const FetchMetaData = (callback) => (dispatch) => {
    ServiceEngine.get(METADATA_ENDPOINT).then(response => {
        dispatch(UpdateMetaData(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}


export const CreateCourse = (coursePayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_COURSE_ENDPOINT, coursePayload).then(response => {
        //response.data
        dispatch(AddNewCourse(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const CreateClass = (classPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_CLASS_ENDPOINT, classPayload).then(response => {
        //response.data
        dispatch(AddNewClass(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const UpdateClass = (classPayload, callback) => (dispatch) => {
    ServiceEngine.put(UPDATE_CLASS_ENDPOINT, classPayload).then(response => {
        //response.data
        dispatch(AddNewClass(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}



export const CreateClassRoom = (classRoomPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_CLASSROOM_ENDPOINT, classRoomPayload).then(response => {
        //response.data
        //dispatch(AddNewClass(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const CreateSession = (sessionPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_SESSION_ENDPOINT, sessionPayload).then(response => {
        //response.data
        //dispatch(AddNewClass(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const GetSessionByClassId = (classId, callback) => (dispatch) => {
    ServiceEngine.get(GET_SESSIONS_BY_CLASSID_ENDPOINT + "?classId=" + classId).then(response => {
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const GetSessions = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_ALL_SESSIONS_ENDPOINT, payload).then(response => {
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const CreateTeacher = (teacherPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_TEACHER_ENDPOINT, teacherPayload).then(response => {
        //response.data
        dispatch(AddNewTeacher(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const UpdateTeacher = (teacherPayload, callback) => (dispatch) => {
    ServiceEngine.put(UPDATE_TEACHER_ENDPOINT, teacherPayload).then(response => {
        //response.data
        dispatch(AddNewTeacher(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    //error.response.data
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}



export default CommonServicesSlice.reducer
