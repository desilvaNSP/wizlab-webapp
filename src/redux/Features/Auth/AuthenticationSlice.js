import { createSlice } from '@reduxjs/toolkit'
import { FETCH_TOKEN_ENDPOINT, HTTP_STATUS_CODE_401_UNAUTHORIZED, HTTP_STATUS_CODE_403_FORBIDDEN } from "../../../Configs/ApgConfigs";
import { ServiceEngine } from "../../../Services/ServiceEngine";

export const AuthenticateSlice = createSlice({
    name: 'auth',
    initialState: {
        AdminUser: "",
        Token: "",
        TokenExpiry: "",
        Role: "",
        InstituteId: ""
    },
    reducers: {
        updateAuthInfo: (state, action) => {
            let obj = action.payload;
            return {
                ...state,
                Token: obj.token.accessToken,
                TokenExpiry: obj.token.expiryDate,
                Role: obj.roleId,
                Institute: obj.instituteId,
                AdminUser: obj.firstName
            };
        },
    },
})

export const { updateAuthInfo } = AuthenticateSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const FetchAuthenticationInfo = (username, password, callback) => (dispatch) => {
    console.log(username)
    let userData = {
        "username": username,
        "password": password
    }
    ServiceEngine.post(FETCH_TOKEN_ENDPOINT, userData).then(response => {
        //response.data
        dispatch(updateAuthInfo(response.data))
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

export default AuthenticateSlice.reducer
