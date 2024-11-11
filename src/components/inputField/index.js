import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import assets from "../../assets";
import FormErrorMessage from "../ErrorMessage";

const InputField = ({
  type,
  placeholder,
  loginInput,
  normalInput,
  rightIcon,
  name,
  value,
  onChange,
  onIconClick,
  disabled,
  isClicked,
  onClick,
  className,
  leftIcon,
  emailIcon,
  successIcon,
  passwordIcon,
  eyeIcon,
  checkboxInput,
  register,
  error,
  messages,
  searchIcon,
  borderGreen,
  usernameIcon,
  borderWhite,
  textarea,
  defaultValue,
  setValue=null
}) => {
  const [inputType, setInputType] = useState(type ? type : "text");

  const toggleIsPassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const hasError = error !== undefined;

 
  return (
    <>
      <div className={`input-field-container  ${className}`}>
        <input
          type={inputType}
          name={name}
          defaultValue={value ?? ''}
          {...register}
          disabled={disabled}
          onChange={onChange ?? null}
          autoComplete="new-password"
          className={`${type == 'checkbox'
              ? "custom-checkbox"
              : borderWhite
                ? "checkbox-white-input"
                : !leftIcon
                  ? "normal-input"
                  : "input-field"
            } ${hasError ? "input-error" : ""}
          ${disabled ? "cursor-none" : ""}
          ${borderGreen ? "border-green" : ""
            } ${inputType === "password" ? "password-input" : ""}`}
          placeholder={placeholder} />        
        {leftIcon && emailIcon && !hasError ? (
          <div className="left-icon-container">
            <img
              className="left-input-icon"
              src={assets.Icons.email}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && emailIcon && hasError ? (
          <div className="left-icon-container">
            <img
              className="left-input-icon"
              src={assets.Icons.emailError}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && searchIcon ? (
          <div className="left-icon-container">
            <img className="search-icon" src={assets.Icons.search} alt="copy" />{" "}
          </div>
        ) : leftIcon && passwordIcon ? (
          <div className="left-icon-container">
            <img
              className="password-icon"
              src={assets.Icons.password}
              alt="copy"
            />{" "}
          </div>
        ) : leftIcon && usernameIcon ? (
          <div className="left-icon-container">
            <img
              className="username-icon"
              src={assets.Icons.username}
              alt="copy"
            />{" "}
          </div>
        ) : (
          ""
        )}
        {rightIcon && !hasError && successIcon ? (
          <div onClick={onIconClick} className="right-icon-container">
            <img
              className="right-input-icon"
              src={assets.Icons.success}
              alt="copy"
            />{" "}
          </div>
        ) : rightIcon && hasError && successIcon ? (
          <div onClick={onIconClick} className="right-icon-container">
            <img
              className="right-input-icon"
              src={assets.Icons.error}
              alt="copy"
            />{" "}
          </div>
        ) : rightIcon && eyeIcon && inputType === "text" ? (
          <div onClick={toggleIsPassword} className="right-icon-container">
            <img className="eye-input-icon" src={assets.Icons.eye} alt="copy" />{" "}
          </div>
        ) : rightIcon && eyeIcon && inputType === "password" ? (
          <div onClick={toggleIsPassword} className="right-icon-container">
            <img
              className="hide-input-icon"
              src={assets.Icons.hide_icon}
              alt="copy"
            />{" "}
          </div>
        ) : (
          ""
        )}
        {rightIcon && eyeIcon && successIcon ? (
          <div
            onClick={toggleIsPassword}
            className="reset-right-icon-container"
          >
            <img className="eye-input-icon" src={assets.Icons.eye} alt="copy" />{" "}
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        <FormErrorMessage error={error} messages={messages} />
      </div>
    </>
  );
};

export default InputField;
