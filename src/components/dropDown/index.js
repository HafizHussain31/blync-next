import React, { useState } from "react";
import "./styles.scss";
import "../inputField/styles.scss";
import assets from "../../assets";
import Select from "react-select";

const DropDownComponent = ({
  name,
  options,
  value,
  onChange,
  error,
  messages,
  register,
  borderGreen,
  leftIcon,
  countryIcon,
  placeholder,
  hidePlaceholder,
  disabled = false,
  handleColorChange,
  searchIcon,
  onClickEdit,
  onClickDelete,
  disableButtons = false,
  isClearable = true,
  disableBorder = false,
  hasImage = false
}) => {
  const customStyles = {
    noOptionsMessage: () => ({
      fontSize: "10px",
      padding: "10px",
      color: "#009BEE",
      fontFamily: "Open-Sans"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      color: "#009BEE",
      cursor: "pointer",
      fontFamily: "Open-Sans",
      fontSize: "10px",
      borderBottom: "1px solid #dedede",
      padding: "10px 20px",

    }),
    control: (provided, state) => ({
      ...provided,
      border: error ? "1px solid red" : disableBorder ? "0px solid #009BEE" : "1px solid #009BEE",
      fontSize: "12px",
      fontFamily: "Open-Sans",
      padding: leftIcon ? "0 20px" : hidePlaceholder ? "0" : "0 5px",
      height: "40px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#009BEE",
      display: hidePlaceholder && "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#009BEE",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#009BEE",
    }),
  };

  const formatOptionLabel = ({ label }) => (
    <div>
      {(label && `${label}`?.startsWith('https://')) ? <img src={label} alt="option"  className="dropdown-image-item" />
        : <span>{label}</span>}
    </div>
  );


  return (
    <div className="select-container">
      <Select
        options={options.map(option => ({
          value: option.value,
          label: option.label,
          isDisabled: option?.isDisabled ?? false,
          image: option?.image
        }))}
        styles={customStyles}
        placeholder={placeholder}
        isClearable={isClearable}
        value={value}
        isDisabled={disabled}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
        name={name} />

      {leftIcon && countryIcon ? (
        <div
          className={`${error ? "error-icon-container" : "country-icon-container"
            }`}
        >
          <img
            className="country-input-icon"
            src={assets.Icons.country}
            alt="copy"
          />{" "}
        </div>
      ) : leftIcon && searchIcon ? (
        <div
          className={`${error ? "error-icon-container" : "country-icon-container"
            }`}
        >
          <img className="search-select-icon" src={searchIcon} alt="copy" />{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DropDownComponent;
