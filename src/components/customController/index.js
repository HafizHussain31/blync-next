import React, { useEffect, useRef, forwardRef } from "react";
import { Controller } from "react-hook-form";
import FormErrorMessage from "../ErrorMessage";

const CustomController = forwardRef(
  (
    {
      control,
      name,
      render,
      showError = true,
      error,
      data,
      messages,
      register,
      ...props
    },
    ref
  ) => {
    return (
      <div className="h-100">
        <div>
          <Controller
            {...props}
            name={name}
            {...register}
            render={render}
            defaultValue={
              (data?.value)?.toString() == "" ? "" : data?.value?.toString()
            }
            control={control}
            ref={ref} // Pass the ref down to the Controller
          />
        </div>
        <FormErrorMessage error={error} messages={messages} />
      </div>
    );
  }
);

export default CustomController;
