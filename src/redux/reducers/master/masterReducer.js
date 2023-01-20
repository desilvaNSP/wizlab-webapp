import {
  HIDE_SUB_MENU,
  SHOW_SUB_MENU
} from "../../actions/master/masterActionTypes";
import navigationOptions from "../../../configs/navigationOptions";

const initialState = {
  navigation_options: navigationOptions,
  show_sub_menu: false,
  active_main_section: "",
  sub_options: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case HIDE_SUB_MENU:
      return {
        ...state,
        show_sub_menu: false,
        active_main_section: "",
        sub_options: []
      };

    case SHOW_SUB_MENU:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
