import * as ACTIONS from "../../Actions/Types"

const initialState = {
    Errors: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.MANNUAL_REFUND_FAILED:
            return {
                ...state,
                Errors: action.payload
            };
        default:
            return state;
    }
}
