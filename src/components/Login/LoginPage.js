import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchToken } from "../../Redux/Actions/Auth/Authentication";
import "./login.css";

const LoginPage = props => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = () => {
    props.fetchToken(UserName, Password);
  };
  return (
    <div className="master-container">
      <main className="main-page login-page">
        <section className="login-section-wrapper">
          <h1 className="login-section__title" style={{ color: "black" }}>
            Classroom Admin
          </h1>
          <div className="login-section__form">
            <div className="form-group">
              <label className="form-group__label">Employee Number</label>
              <input
                className="form-group__input"
                type="text"
                name="username"
                id="defaultFormEmailEx"
                value={UserName}
                onChange={e => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-group__label">Pin</label>
              <input
                className="form-group__input"
                type="password"
                name="password"
                id="defaultFormPasswordEx"
                value={Password}
                onChange={e => setPassword(e.target.value)}
              />
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

export default connect(null, { fetchToken })(LoginPage);
