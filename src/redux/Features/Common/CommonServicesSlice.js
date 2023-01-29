import { createSlice } from '@reduxjs/toolkit'
import { METADATA_ENDPOINT, HTTP_STATUS_CODE_401_UNAUTHORIZED, HTTP_STATUS_CODE_403_FORBIDDEN } from "../../../Configs/ApgConfigs";
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
    },
})

export const { UpdateMetaData } = CommonServicesSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(UpdateMetaData(response.data))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const FetchMetaData = (callback) => (dispatch) => {
    
    ServiceEngine.get(METADATA_ENDPOINT + '?instituteId=2').then(response => {
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

export default CommonServicesSlice.reducer
