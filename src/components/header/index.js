import React from "react";
import "./styles.scss";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ExportedData from "../../assets";

const Header = () => {
  let navigate = useNavigate();
  return (
    <div className="header-container">
      <div>
        <p className="header-title">Welcome!</p>
      </div>
      <div className="header-icon-container">
        <div className="bell-icon-container">
          <img
            src={assets.Icons.bell}
            alt="bell"
            className="bell-icon"
            onClick={() => navigate("/main/notification")}
          />
          <div className="count-container">
            {/* <span className="count-text">2</span> */}
          </div>
        </div>

        <img
          src={null}
          alt="profile"
          className="profile-picture"
          onClick={() => navigate("/main/profile-settings")}
          onError={(e) => {
            e.target.src = ExportedData.Images.user_placeholder;
            e.target.onerror = null; // To prevent infinite fallback loops
          }}
        />
      </div>
    </div>
  );
};

export default Header;
