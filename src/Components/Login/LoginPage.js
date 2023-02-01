import React, { useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FetchAuthenticationInfo } from "../../Redux/Features/Auth/AuthenticationSlice";
import "./login.css";

const LoginPage = (props) => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  // Cookies...
  // AdminUser
  // Token
  // TokenExpiry
  // Role
  // InstituteId
  const [adminUser, setAdminUser] = useCookies(['admin_user']);
  const [token, setToken] = useCookies(['token']);
  const [tokenExpiry, setTokenExpiry] = useCookies(['token_expiry']);
  const [role, setRole] = useCookies(['role']);
  const [instituteId, setInstituteId] = useCookies(['institute_id']);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(FetchAuthenticationInfo(UserName, Password, function (response, success) {
      if (success) {
        setAdminUser('admin_user', response.firstName, { path: '/' });
        setToken('token', response.token.accessToken, { path: '/' });
        setTokenExpiry('token_expiry', response.token.expiryDate, { path: '/' });
        setRole('role', response.roleId, { path: '/' });
        setInstituteId('institute_id', response.instituteId, { path: '/' });
      } else {
        //error handle
      }
    }));
  };

  return (
    <div className="master-container">
      <main className="main-page login-page">
        <section className="login-section-wrapper">
          <h1 className="login-section__title" style={{ color: "black" }}>
            Classroom Backoffice
          </h1>
          <div className="login-section__form">
            <div className="form-group">
              <div className="form-group-col">
                <label className="form-group__label">Employee User Name</label>
                <input
                  className="form-group__input"
                  type="text"
                  name="username"
                  id="defaultFormEmailEx"
                  value={UserName}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-group-col">
                <label className="form-group__label">Password</label>
                <input
                  className="form-group__input"
                  type="password"
                  name="password"
                  id="defaultFormPasswordEx"
                  value={Password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="btn-control">
              <button
                className="btn btn--primary btn--login"
                onClick={handleLogin}
                type="button"
              >
                LOGIN
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
