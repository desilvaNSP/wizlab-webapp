import { createSlice, current } from '@reduxjs/toolkit'
import update from 'react-addons-update';
import { ServiceEngine } from "../../../Services/ServiceEngine";
import { 
    GET_ALL_STUDENTS_ENDPOINT,
    GET_ENROLLMENTS_BY_CLASSID_ENDPOINT, 
    HTTP_STATUS_CODE_401_UNAUTHORIZED, 
    HTTP_STATUS_CODE_403_FORBIDDEN,
    UPDATE_ENROLLMENT_ENDPOINT } from "../../../Configs/ApgConfigs";


export const EnrollmentServicesSlice = createSlice({
    name: 'enrollments',
    initialState: {
        Enrollments: []
    },
    reducers: {
        GetEnrollmentsToStore(state, action) {
            var obj = action.payload;
            return {
                ...state,
                Enrollments: obj
            };
        },
        UpdateEnrollment(state, action) {
            var existingEndrollments = current(state).Enrollments
            var updatedEnrollment = action.payload;
            const updatedEnrollments = existingEndrollments.map(enrollment => {
                if (updatedEnrollment.id == enrollment.id) {
                    let updateEvent = update(enrollment, { applicableFee: { $set: updatedEnrollment.applicableFee }, paymentDueDate: { $set: updatedEnrollment.paymentDueDate } })
                    return updateEvent;
                } else {
                    return enrollment;
                }
            });
            return {
                ...state,
                Enrollments: updatedEnrollments
            };
        }
    },
})

export const { GetEnrollmentsToStore, UpdateEnrollment } = EnrollmentServicesSlice.actions


export const GetEnrollmentsById = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_ENROLLMENTS_BY_CLASSID_ENDPOINT, payload).then(response => {
        dispatch(GetEnrollmentsToStore(response.data))
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


export const GetAllEnrollments = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_ALL_STUDENTS_ENDPOINT, payload).then(response => {
        //response.data
        dispatch(GetEnrollmentsToStore(response.data))
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



export const UpdateEnrollmentById = (enrollmentPayload, callback) => (dispatch) => {
    ServiceEngine.put(UPDATE_ENROLLMENT_ENDPOINT, enrollmentPayload).then(response => {
        dispatch(UpdateEnrollment(response.data))
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

export default EnrollmentServicesSlice.reducer