import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";

const Login = () => {
  

  const onSubmit = (data) => {

  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({ mode: "onBlur" });

  return (
    <>
      <form
        className="col-md-6 login-container"
        onSubmit={handleSubmit(onSubmit)}
      >
      </form>
    </>
  );
};

export default Login;
