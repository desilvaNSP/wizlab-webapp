import { FETCH_TOKEN } from "../../actions/auth/authActionTypes";
import { setAuthHeader } from "../../services/APIBuilder";

const initialState = {
  access_token: ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_TOKEN: {
      setAuthHeader(payload);
      return {
        ...state,
        access_token: payload
      };
    }
    default:
      return state;
  }
}
