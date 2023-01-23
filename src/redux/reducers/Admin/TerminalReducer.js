import * as ACTIONS from "../../Actions/Types"

const initialState = {
    Terminals: [],
    TerminalNetworks: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.GET_ALL_TERMINALS:
            return {
                ...state,
                Terminals: action.payload
            };
        case ACTIONS.GET_ALL_TERMINALS_FAILED:
            return {
                ...state
            };
        case ACTIONS.GET_ALL_TERMINAL_NETWORKS:
            return {
                ...state,
                TerminalNetworks: action.payload
            };
        case ACTIONS.GET_ALL_TERMINAL_NETWORKS_FAILED:
            return {
                ...state
            };
        case ACTIONS.DELETE_TERMINAL_NETWORKS:
            return {
                ...state,
                TerminalNetworks: [...state.TerminalNetworks.filter((element)=>{
                    return element.id != action.payload
                })]
            };
        case ACTIONS.DELETE_TERMINAL_NETWORKS_FAILED:
            return {
                ...state
            };
        default:
            return state;
    }
}
