import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import cookieHandler from "./Handlers/cookieHandler";
import LoginPage from "./Components/Login/LoginPage";
import { SetAuthHeader } from "./Services/ApgServiceEngine";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Slider from "./Components/Slider/Slider";
import ClassesIndex from "./Components/ClassManagement/Index";
import Instructors from "./Components/InstructorManagement/Instructors";
import Sessions from "./Components/SessionManagement/Sessions";
import ClassDetails from "./Components/ClassManagement/Classes/ClassDetails";

const App = props => {
  const [sliderOpen, setSliderOpen] = useState(false);

  const redirectToLoginPage = () => {
    return <LoginPage />;
  };

  const isTokenExists = () => {
    const token = cookieHandler.getCookie("access_token");
    if (token !== "") {
      // Set Auth Headers here.
      SetAuthHeader(token);
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
      <div className="wp-container">

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/classes" component={ClassesIndex} />
          <Route exact path="/classes/:classId" component={ClassDetails} />
          <Route exact path="/instructors" component={Instructors} />
          <Route exact path="/sessions" component={Sessions} />
        </Switch>
        <Footer />
      </div>
      <span className="fixed-menu-btn" onClick={() => toggleSlider()} />
    </Router>
  );

  return isTokenExists() ? renderContent() : redirectToLoginPage();
};

export default App
