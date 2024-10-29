import React from "react";
import "./ErrorMessage.scss";

const FormErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <span className="form-error">
      {error.message ? error.message : "Error in field"}
    </span>
  );
};
export default FormErrorMessage;
