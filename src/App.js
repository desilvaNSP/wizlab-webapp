import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import { SetAuthHeader } from "./Services/ServiceEngine";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Slider from "./Components/Slider/Slider";
import { useSelector, useDispatch } from "react-redux";
import useCookies from "react-cookie/cjs/useCookies";
import { FetchMetaData } from "./Redux/Features/Common/CommonServicesSlice";

const App = props => {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [token, setToken, removeToken] = useCookies(['token']);
  const [tokenExpiry, setTokenExpiry] = useCookies(['token_expiry']);
  const [instituteId, setInstituteId] = useCookies(['institute_id']);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const common = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(FetchMetaData(function (response, success) {
      if (success) {

      } else {
        //error handle
      }
    }));
  }, [token?.token])


  const redirectToLoginPage = () => {
    return <LoginPage />;
  };

  const isTokenExists = () => {
    // Check token exists in cookie
    // TODO: Check expiry date for validation.
    if (token?.token == "" || token?.token == undefined) {
      return false;
    } else {
      SetAuthHeader(token?.token, instituteId?.institute_id);
      return true;
    }
  };

  const handleLogout = () => {
    // remove token
    // TODO: Remove all cookies
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
  </div>
};

export default App
