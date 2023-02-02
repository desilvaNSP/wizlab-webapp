import { createSlice } from '@reduxjs/toolkit'
import { METADATA_ENDPOINT, CREATE_COURSE_ENDPOINT, HTTP_STATUS_CODE_401_UNAUTHORIZED, HTTP_STATUS_CODE_403_FORBIDDEN, CREATE_CLASS_ENDPOINT, CREATE_CLASSROOM_ENDPOINT, CREATE_SESSION_ENDPOINT } from "../../../Configs/ApgConfigs";
import { ServiceEngine } from "../../../Services/ServiceEngine";


export const CommonServicesSlice = createSlice({
    name: 'common',
    initialState: {
        ClassRooms: [],
        Classes: [],
        Courses:[],
        InstituteId: "",
        Location: "",
        InstituteName: "",
        Teachers:[],
        Users:[],
        PaymentStatus:[],
        UserRoles:[]
    },
    reducers: {
        UpdateMetaData: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                ClassRooms: obj.institute?.classRooms,
                Classes: obj.institute?.classes,
                Courses:obj.institute?.courses,
                InstituteId: obj.institute?.id,
                Location: obj.institute?.location,
                InstituteName: obj.institute?.name,
                Teachers:obj.institute?.teachers,
                Users:obj.institute?.users,
                PaymentStatus: obj.paymentStatuses,
                UserRoles:obj.userRoles
            };
        },
        AddNewClass: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Courses: [...state.Courses, obj]
            };
        }
    },
})

export const { UpdateMetaData, AddNewClass } = CommonServicesSlice.actions


export const FetchMetaData = (callback) => (dispatch) => {
    ServiceEngine.get(METADATA_ENDPOINT).then(response => {
        dispatch(UpdateMetaData(response.data))
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


export const CreateCourse = (coursePayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_COURSE_ENDPOINT, coursePayload).then(response => {
        //response.data
        dispatch(AddNewClass(response.data))
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

export const CreateClass = (classPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_CLASS_ENDPOINT, classPayload).then(response => {
        //response.data
        dispatch(AddNewClass(response.data))
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

export const CreateClassRoom = (classRoomPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_CLASSROOM_ENDPOINT, classRoomPayload).then(response => {
        //response.data
        //dispatch(AddNewClass(response.data))
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

export const CreateSession = (sessionPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_SESSION_ENDPOINT, sessionPayload).then(response => {
        //response.data
        //dispatch(AddNewClass(response.data))
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

export default CommonServicesSlice.reducer
