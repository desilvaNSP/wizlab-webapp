import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showSubMenu } from "../../redux/actions/master/masterActionCreator";

const MenuItem = props => {
  let selectedMenuPath = props.Item.path;
  let isLink = props.Item.type === "internal";
  return isLink ? (
    <li className="aside-menu-content__item">
      <Link className="link-menu" to={selectedMenuPath}>
        <div className="aside-menu-content__item-txt-block">
          <span className="aside-menu-content__item-count">+9</span>
          <span className="aside-menu-content__item-text">
            {props.Item.name}
          </span>
        </div>
      </Link>
      <span
        className="aside-menu-content__item-icon"
        onClick={() => props.showSubMenu(props.Item)}
      >
        <i className="fas fa-bars"></i>
      </span>
    </li>
  ) : (
    <li className="aside-menu-content__item">
      <a className="link-menu" href={selectedMenuPath}>
        <div className="aside-menu-content__item-txt-block">
          <span className="aside-menu-content__item-count">+9</span>
          <span className="aside-menu-content__item-text">
            {props.Item.name}
          </span>
        </div>
      </a>
      <span
        className="aside-menu-content__item-icon"
        onClick={() => props.showSubMenu(props.Item)}
      >
        <i className="fas fa-bars"></i>
      </span>
    </li>
  );
};

export default connect(null, { showSubMenu })(MenuItem);
