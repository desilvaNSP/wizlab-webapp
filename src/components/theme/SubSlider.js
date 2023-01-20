import React from "react";
import { withRouter } from "react-router-dom";

const SubSlider = props => {
  const iconClicked = subItem => {
    var isLink = subItem.type === "internal";
    props.HideSumMenu();
    if (isLink) {
      props.history.push(subItem.path);
    } else {
      window.location.href = subItem.path;
    }
  };
  const renderSubMenu =
    props.Options &&
    props.Options.length > 0 &&
    props.Options.map((subItem, index) => {
      return (
        <li
          key={index}
          className="aside-menu-content__item link-menu"
          onClick={() => iconClicked(subItem)}
        >
          <div className="aside-menu-content__item-txt-block">
            <span className="aside-menu-content__item-text">
              {subItem.name}
            </span>
          </div>
        </li>
      );
    });
  return (
    <div className="sub-menu">
      <div className="aside-menu-header">
        <div className="sub-sider-menu-header">{props.ActiveTitle}</div>
      </div>
      <ul className="aside-menu-content">{renderSubMenu}</ul>
    </div>
  );
};

export default withRouter(SubSlider);
