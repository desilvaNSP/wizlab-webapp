import * as ACTIONS from "../../Actions/Types"

const initialState = {
    IsLoading: false,
    AdminUser: "SYSTEM",
    AccessToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJhcGk6Ly83YzlhZjc2OS1lMmQ2LTRkOWUtYWYwYy1kMmVjYjdmYzY3ZjIiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNDQxM2ZmMC04ZDAxLTRmY2MtOTllMS1hNzkxNzFhZWFkYTAvIiwiaWF0IjoxNjY3NDUzMDU1LCJuYmYiOjE2Njc0NTMwNTUsImV4cCI6MTY2NzQ1ODM0NywiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQUZYem5BTmtPYTEyQ1Y4alRXUlNHTGpIWEwyTG5jVWk4OE1uYkNlREFGRC9XKzA2TWZMcDhWTU50OUttVERJTktEWjlPd0lNdkxVdURHVWZSMnMwUzNuaUZRbG4rWEFwcDVtOUJLQTRYT0hrPSIsImFtciI6WyJwd2QiLCJyc2EiXSwiYXBwaWQiOiIwZjEzM2EwZC01ZTRhLTRmZDAtYTEzMi1mYTM1NjlkNzk5ZGYiLCJhcHBpZGFjciI6IjAiLCJkZXZpY2VpZCI6IjI3MDJkMzFkLTBhZGItNGNjNi04NjU2LWZjYmMzYWNjZjY3ZSIsImZhbWlseV9uYW1lIjoiUHJpeWFua2EiLCJnaXZlbl9uYW1lIjoiU2FuZHVuIiwiaXBhZGRyIjoiMTIzLjIzMS4xMDguNzMiLCJuYW1lIjoiU2FuZHVuIFByaXlhbmthIiwib2lkIjoiOGI3ZTAxNmUtYmI5Mi00ZWQ4LThhOTAtMDdiNjU3Y2FmZGUxIiwicmgiOiIwLkFWNEE4RDlCQkFHTnpFLVo0YWVSY2E2dG9HbjNtbnpXNHA1TnJ3elM3TGY4Wl9KZUFHby4iLCJyb2xlcyI6WyJUYXNrLkNyZWF0ZSJdLCJzY3AiOiJBcGlzLkFsbCIsInN1YiI6ImNTcm1ZdTcxY190MlVoVkdpaVNud3pLUGJhbXQ4NmdRd0toM2EyMmxoLUkiLCJ0aWQiOiIwNDQxM2ZmMC04ZDAxLTRmY2MtOTllMS1hNzkxNzFhZWFkYTAiLCJ1bmlxdWVfbmFtZSI6InNhbmR1bi5wcml5YW5rYUB3ZXN0cGF5LnNlIiwidXBuIjoic2FuZHVuLnByaXlhbmthQHdlc3RwYXkuc2UiLCJ1dGkiOiItbk5VcmVjVTIwNlRib3NBQWVFNEFBIiwidmVyIjoiMS4wIn0.EvddHkTJULL5-_OEFJ6igc6pKC0Ojf2UgD0SXZGR-HdEi3M4yLl3t2TjIs-AHucXAd5qE_s2pkViB8oMpzF5roLy-pEwGapGvCE0FMxBR1v0pyf2uoVdq_Wc8Tw5mGcVlnFgfLYjYxcuml0UhWDK8g4kYpN9GIXwmG-c87KNxPuO2V6zh7DcJYpCxiiR_O3bfHmYMSDYWzew2_VgVjpzhJQszKb2YgwXgy4ZV-6OGBx1XFtRqK1bBrat9p7c-jk4rz8idlmz0LvQ-mvQzOq0vF4kxQ2Zi_i6e9ByT7c5v_-BFadamGkWXxdeylC6mrtWZtDJY7V9kDuciCdkQoTNVg",
    Login:true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ACCESS_TOKEN:
            return {
                ...state,
                IsLoading: true,
                AccessToken: action.payload,
                AdminUser: action.userName,
                Login: action.login
            };
        default:
            return state;
    }
}
