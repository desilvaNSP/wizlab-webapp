import React, { useState, useEffect } from "react";
import Slider from "./components/theme/Slider";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import cookieHandler from "./handlers/cookieHandler";
import { Route } from "react-router-dom";
import BaseUrls from "./configs/baseUrls";
import LoginPage from "./components/pages/Login/LoginPage";
import { setAuthHeader } from "./redux/services/APIBuilder";
import HomePage from "./components/pages/HomePage";

import { setTokenOnStore } from "./redux/actions/auth/authActionCreator";

const App = props => {
  const [SliderOpen, setSliderOpen] = useState(false);

  const redirectToManagerPortalLoginPage = () => {
    // window.location.href =
    //   BaseUrls.MANAGER_PORTAL_BASE_END_POINT + "/index.html#/login";
    return <LoginPage />;
  };
  const isTokenExists = () => {
    const token = cookieHandler.getCookie("access_token");
    if (token !== "") {
      // Set Auth Headers here.
      setAuthHeader(token);
      //props.setTokenOnStore(token);
      return true;
    } else {
      redirectToManagerPortalLoginPage();
      return false;
    }
  };

  const renderContent = () => (
    <div className="App">
      {SliderOpen && <Slider menuVisibility={SliderOpen} />}
      <span
        className="fixed-menu-btn"
        onClick={() => setSliderOpen(!SliderOpen)}
      />
      <Route exact path="/" component={HomePage} />
    </div>
  );

  return isTokenExists() ? renderContent() : redirectToManagerPortalLoginPage();
};

const mapStateToProps = state => ({
  access_token: state.auth.access_token
});

export default connect(mapStateToProps, { setTokenOnStore })(withRouter(App));
