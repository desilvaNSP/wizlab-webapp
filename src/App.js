import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import { SetAuthHeader } from "./Services/ServiceEngine";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Slider from "./Components/Slider/Slider";
import { useDispatch } from "react-redux";
import useCookies from "react-cookie/cjs/useCookies";
import { FetchMetaData, StartLoading, StopLoading } from "./Redux/Features/Common/CommonServicesSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = props => {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [token, setToken, removeToken] = useCookies(['token']);
  const [tokenExpiry, setTokenExpiry] = useCookies(['token_expiry']);
  const [instituteId, setInstituteId] = useCookies(['institute_id']);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StartLoading("initializing.."))
    dispatch(FetchMetaData(function (response, success) {
      if (success) {

      } else {
        //error handle
      }
      dispatch(StopLoading())
    }));
  }, [token?.token])


  const redirectToLoginPage = () => {
    return <LoginPage />;
  };

  const isTokenExists = () => {
    console.log(tokenExpiry)
    if ((token?.token == "" || token?.token == undefined)) {
      return false;
    } else {
      SetAuthHeader(token?.token, instituteId?.institute_id);
      return true;
    }
  };

  const handleLogout = () => {
    removeToken('token');
  }

  const toggleSlider = () => {
    setSliderOpen(!sliderOpen)
  }

  const handleSlideClose = () => {
    setSliderOpen(false)
  }

  const renderContent = () => (
    <div>
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
        <Outlet />
        <Footer />
      </div>
      <span className="fixed-menu-btn" onClick={() => toggleSlider()} />
    </div>
  );

  return <div className="App">
    {/*auth.IsLoading &&
      <div className="main-loader"  >
        <img src="/assets/images/loading.svg" alt="loader" />
        <div className="main-loader__txt">{auth.LoadingMessage}</div>
      </div>
      */}
    {isTokenExists() ? renderContent() : redirectToLoginPage()}
    <ToastContainer autoClose={5000} />
  </div>
};

export default App
