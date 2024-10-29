import React from "react";
import "./layout.scss";
import assets from "../assets";

export function AuthLayout(props) {
  return (
    <div className="login-main-container">
      <div className="col-md-6 ">
        <div className="login-background-container">
          <img src={assets.Images.login} alt="login" className="login-image" />
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default AuthLayout;
