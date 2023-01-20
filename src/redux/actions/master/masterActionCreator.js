import { SHOW_SUB_MENU, HIDE_SUB_MENU } from "./masterActionTypes";

/**
 * Show sub menu component. render option list belongs to main item called activeItem
 * @param {object} activeItem
 */
export const showSubMenu = activeItem => dispatch => {
  dispatch({
    type: SHOW_SUB_MENU,
    payload: {
      active_main_section: activeItem.name,
      show_sub_menu: true,
      sub_options: activeItem.sub_options
    }
  });
};

/**
 * Hide Sub Menu Action Creator
 */
export const hideSubMenu = () => dispatch => {
  dispatch({
    type: HIDE_SUB_MENU
  });
};
