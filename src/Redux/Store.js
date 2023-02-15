import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from '../Redux/Features/Auth/AuthenticationSlice';
import CommonServicesReducer from './Features/Common/CommonServicesSlice';
import EnrollmentServicesSlice from './Features/Enrollments/EnrollmentServicesSlice';
import PaymentServicesReducer from './Features/Payment/PaymentServicesSlice';

export default configureStore({
  reducer: {
    auth: AuthenticationReducer,
    common: CommonServicesReducer,
    payment: PaymentServicesReducer,
    enrollments: EnrollmentServicesSlice
  },
})