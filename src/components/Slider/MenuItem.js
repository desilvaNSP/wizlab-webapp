import React from 'react';
import { Link } from 'react-router-dom'

const MenuItem = ({item, hideSlider}) => {
  return (
    <li class="aside-menu-content__item">
      <Link className="link-menu" to={item.path} relative="path" onClick={(e)=>{
          e.stopPropagation();
          hideSlider();
      }}>
        <div className="aside-menu-content__item-txt-block">
          <span className="aside-menu-content__item-text">{item.name}</span>
        </div>
      </Link>
    </li>
  )
}

export default MenuItem;
