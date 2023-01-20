import React from "react";
import Clock from "react-live-clock";
import { connect } from "react-redux";
import MenuItem from "./MenuItem";

import {
  showSubMenu,
  hideSubMenu
} from "../../redux/actions/master/masterActionCreator";
import SubSlider from "./SubSlider";

const Slider = props => {
  const renderMainMenu = props.navigationOptions.map((mainItem, index) => (
    <MenuItem key={index} Item={mainItem} />
  ));
  return (
    <aside className="aside-menu" onMouseDown={props.handleMouseDown}>
      <div className="aside-menu-header">
        <div className="aside-menu-header__time">
          <Clock format={"h:mm A"} ticking={true} timezone={"US/Pacific"} />
        </div>
        <div className="aside-menu-header__date">
          <Clock
            date={new Date().toString()}
            format={"MMMM D, YYYY"}
            timezone={"US/Pacific"}
          />
        </div>
        <div className="aside-menu-header__country">United States</div>
      </div>
      <ul className="aside-menu-content">{renderMainMenu}</ul>
      {props.showSubMenu && props.subOptions.length > 0 ? (
        <SubSlider
          Options={props.subOptions}
          ActiveTitle={props.activeMainSection}
          HideSumMenu={() => props.hideSubMenu()}
        />
      ) : null}
      <div className="aside-menu-version">
        Version : {process.env.REACT_APP_VERSION}
      </div>
    </aside>
  );
};
const mapStateToProps = state => ({
  navigationOptions: state.master.navigation_options,
  activeMainSection: state.master.active_main_section,
  showSubMenu: state.master.show_sub_menu,
  subOptions: state.master.sub_options
});
export default connect(mapStateToProps, { showSubMenu, hideSubMenu })(Slider);
