import React from "react";
import "./styles.scss";
import "../inputField/styles.scss";
import Select from "react-select";


const MultiSelect = ({
  name,
  options,
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
}) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      color: "#0a6a78",
      cursor: "pointer",
      fontFamily: "Open-Sans",
      fontSize: "12px",
      borderBottom: "1px solid #dedede",
      padding: "10px 20px",
    }),
    control: (provided) => ({
      ...provided,
      border: error ? "1px solid red" : "1px solid #009BEE",
      fontSize: "12px",
      fontFamily: "Open-Sans",
      padding: "0 5px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#009BEE",
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
      color: "#0a6a78",
    }),
  };
  return (
    <div className="select-container">
      <Select
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isClearable
        isMulti
        defaultValue={value}
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        name={name} />
    </div>
  );
};

export default MultiSelect;
