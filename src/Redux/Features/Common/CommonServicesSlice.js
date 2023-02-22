import { createSlice, current } from '@reduxjs/toolkit'
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
    GET_CLASSES_ENDPOINT,
    HTTP_STATUS_CODE_404_NOT_FOUND,
    ADD_NEWLEVELS_AND_SUBJECTS_ENDPOINT,
    UPDATE_SUBJECTS_BY_ID_ENDPOINT,
    DELETE_LEVEL_ENDPOINT,
    DELETE_SUBJECT_ENDPOINT,
    CREATE_SUBJECTS_ENDPOINT,
    CREATE_TEACHER_ENDPOINT, 
    UPDATE_TEACHER_ENDPOINT,
    GET_TEACHERS_ENDPOINT} from "../../../Configs/ApgConfigs";

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
        IsLoading: 0,
        LoadingMessage: []
    },
    reducers: {
        ShowLoading: (state, action) => {
            var loadingPayload = {
                key: action.payload.index,
                message: action.payload.message
            }
            return {
                ...state,
                IsLoading: current(state).IsLoading +  1,
                LoadingMessage: [...current(state).LoadingMessage, loadingPayload]
            };
        },
        HideLoading: (state, action) => {
            var filteredMessageArray = current(state).LoadingMessage?.filter((obj) => { return obj.key != action.payload })
            return {
                ...state,
                IsLoading: current(state).IsLoading -  1,
                LoadingMessage: filteredMessageArray
            };
        },
        UpdateMetaData: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                ClassRooms: obj.institute?.classRooms,
                Classes:{
                    classes: obj.institute?.classes,
                    totalNumberOfEntries: obj.institute?.classes.length
                }, 
                Courses: obj.institute?.courses,
                InstituteId: obj.institute?.id,
                Location: obj.institute?.location,
                InstituteName: obj.institute?.name,
                Teachers: {
                    teachers: obj.institute?.teachers,
                    totalNumberOfEntries: obj.institute?.teachers.length
                },
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
        UpdateCourse : (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Courses: [...state.Courses.filter((course) => { return course.id != obj.course?.id}), obj.course]
            };
        },
        DeleteSubjects: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Courses: [...state.Courses.filter((course) => { return course.id != obj.course?.id}), obj.course]
            };
        },
        DeleteLevel: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Courses: [...state.Courses.filter((course) => { return course.id != obj.course?.id}), obj.course]
            };
        },
        UpdateClasses: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Classes:{ 
                    classes: obj?.classes,
                    totalNumberOfEntries: obj?.totalNumberOfEntries
                }, 
            };
        },
        AddNewClass: (state, action) => {
            let obj = action.payload;
            var classesState = current(state).Classes;
            return {
                ...state,
                Classes:{
                    classes: [...classesState?.classes, obj?.classobj],
                    totalNumberOfEntries: classesState?.totalNumberOfEntries + 1
                }, 
            };
        },
        AddClassRoom:(state, action) => {
            let obj = action.payload;
            return {
                ...state,
                ClassRooms: [...state.ClassRooms, obj]
            };
        },
        AddNewTeacher:(state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Teachers: [...state.Teachers, obj]
            };
        },
        UpdateTeachers: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Teachers:{
                    teachers: obj?.teachers,
                    totalNumberOfEntries: obj?.totalNumberOfEntries
                }, 
            };
        }
    },
})

export const { 
    ShowLoading, 
    HideLoading, 
    UpdateMetaData, 
    AddNewCourse, 
    UpdateCourse,
    AddNewClass,
    UpdateClasses,
    AddClassRoom, 
    DeleteSubjects, 
    DeleteLevel, 
    AddNewTeacher, 
    UpdateTeachers
} = CommonServicesSlice.actions

export const StartLoading = (message, index) => (dispatch) => {
    var payload = {
        message: message,
        index:index
    }
    dispatch(ShowLoading(payload))
}

export const StopLoading = (index) => (dispatch) => {
    dispatch(HideLoading(index))
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
                    toast.error("Creating course failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

// {
//     "courseId": 0,
//     "levels": [
//       {
//         "desc": "string",
//         "subjects": [
//           {
//             "title": "string",
//             "medium": "string",
//             "subjectCode": "string",
//             "credits": 0
//           }
//         ]
//       }
//     ]
//   }
export const AddNewLevelAndSubjects = (coursePayload, callback) => (dispatch) => {
    ServiceEngine.post(ADD_NEWLEVELS_AND_SUBJECTS_ENDPOINT, coursePayload).then(response => {
        dispatch(UpdateCourse(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Adding new levels failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

// {
//     "title": "string",
//     "medium": "string",
//     "subjectCode": "string",
//     "credits": 0,
//     "levelId": 0
//   }
export const CreateSubjectsForLevel = (coursePayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_SUBJECTS_ENDPOINT, coursePayload).then(response => {
        dispatch(UpdateCourse(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Adding new subjects to the level failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

// {
//     "id": 0,
//     "title": "string",
//     "medium": "string",
//     "subjectCode": "string",
//     "credits": 0
//   }
export const UpdateSubjectBySubjectId = (updatePayload, callback) => (dispatch) => {
    ServiceEngine.put(UPDATE_SUBJECTS_BY_ID_ENDPOINT, updatePayload).then(response => {
        dispatch(UpdateCourse(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Updating subjects failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

// {
//     "id": 0
// }  
export const DeleteLevelById = (payload, callback) => (dispatch) => {
    ServiceEngine.delete(DELETE_LEVEL_ENDPOINT,  { data: payload }).then(response => {
        dispatch(DeleteLevel(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Deleting level failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

// {
//     "id": 0
// }
  
export const DeleteSubjectById  = (payload, callback) => (dispatch) => {
    ServiceEngine.delete(DELETE_SUBJECT_ENDPOINT, { data: payload }).then(response => {
        dispatch(DeleteSubjects(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Deleting subject failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const CreateClass = (classPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_CLASS_ENDPOINT, classPayload).then(response => {
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
                    toast.error("Creating class failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const UpdateClass = (classPayload, callback) => (dispatch) => {
    ServiceEngine.put(UPDATE_CLASS_ENDPOINT, classPayload).then(response => {
        // dispatch(UpdateExistingClass(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Updating class failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const GetClasses = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_CLASSES_ENDPOINT, payload).then(response => {
        dispatch(UpdateClasses(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else if (HTTP_STATUS_CODE_404_NOT_FOUND === error.response.status) {
                    toast.warning("Classes are not found for selected criteria")
                } else {
                    toast.error("Get classes failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const CreateClassRoom = (classRoomPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_CLASSROOM_ENDPOINT, classRoomPayload).then(response => {
        dispatch(AddClassRoom(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Creating class room failed with " + error.response.data.message + " - " + error.response.status);
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

export const CreateTeacher = (teacherPayload, callback) => (dispatch) => {
    ServiceEngine.post(CREATE_TEACHER_ENDPOINT, teacherPayload).then(response => {
        //dispatch(AddNewTeacher(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Creating teacher failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const UpdateTeacher = (teacherPayload, callback) => (dispatch) => {
    ServiceEngine.put(UPDATE_TEACHER_ENDPOINT, teacherPayload).then(response => {
        //dispatch(AddNewTeacher(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else {
                    toast.error("Updating teacher failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export const GetTeachers = (payload, callback) => (dispatch) => {
    ServiceEngine.post(GET_TEACHERS_ENDPOINT, payload).then(response => {
        dispatch(UpdateTeachers(response.data))
        callback(response.data, true);
    }).catch(
        error => {
            if (error.response !== undefined) {
                if (HTTP_STATUS_CODE_401_UNAUTHORIZED === error.response.status) {
                    toast.error(ERROR_MESSAGE_401_UNAUTHORIZED)
                } else if (HTTP_STATUS_CODE_403_FORBIDDEN === error.response.status) {
                    toast.error(ERROR_MESSAGE_403_FORBIDDEN)
                } else if (HTTP_STATUS_CODE_404_NOT_FOUND === error.response.status) {
                    toast.warning("Teachers are not found for selected criteria")
                } else {
                    toast.error("Get teachers failed with " + error.response.data.message + " - " + error.response.status);
                }
            } else {
                toast.error("Check your internet connection or network connectivity issue between servers");
            }
            callback(null, false);
        })
}

export default CommonServicesSlice.reducer
