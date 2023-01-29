import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from '../Redux/Features/Auth/AuthenticationSlice';
import CommonServicesReducer from '../Redux/Features/Common/CommonServicesSlice'; 

export default configureStore({
  reducer: {
    auth: AuthenticationReducer,
    common:CommonServicesReducer
  },
})