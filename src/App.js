import React, { useState, useEffect } from "react";
import Slider from "./components/pages/Slider/Slider";
import { Route, BrowserRouter as Router, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import cookieHandler from "./handlers/cookieHandler";
import LoginPage from "./components/pages/Login/LoginPage";
import { setAuthHeader } from "./redux/services/APIBuilder";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { setTokenOnStore } from "./redux/actions/auth/authActionCreator";
import Index from "./components/pages/ClassManagement/Index";

const App = props => {
  const [sliderOpen, setSliderOpen] = useState(false);

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
      return true;
    }
  };

  const handleLogout = () => {
    alert('handle logout');
  }

  const toggleSlider = () => {
    setSliderOpen(!sliderOpen)
  }

  const handleSlideClose = () => {
    setSliderOpen(false)
  }

  const renderContent = () => (
    <Router>
      {sliderOpen && (
        <Slider handleClose={handleSlideClose} />
      )}
      <div className="wp-container">
        <Header>
          <div className="user-welcome-message">Welcome <b>Sandun</b></div>
          <button
            className="btn btn--danger btn-logout"
            onClick={handleLogout}
            type="button"
            hint="Logout"
          >
            Logout
          </button>
        </Header>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/classes" component={Index} />
        </Switch>
        <Footer />
      </div>
      <span className="fixed-menu-btn" onClick={() => toggleSlider()} />
    </Router>
  );

  return isTokenExists() ? renderContent() : redirectToManagerPortalLoginPage();
};

const mapStateToProps = state => ({
  access_token: state.auth.access_token
});

export default connect(mapStateToProps, { setTokenOnStore })(withRouter(App));
