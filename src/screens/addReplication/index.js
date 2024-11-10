import React, { useEffect } from "react";
import "./styles.scss";
import assets from "../../assets";
import InputField from "../../components/inputField";
import DropDownComponent from "../../components/dropDown";
import { useState } from "react";
import PrimaryButton from "../../components/primaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomController from "../../components/customController";
import { dropDownValidation } from "../../utils";

const AddReplication = () => {
  let navigate = useNavigate();

  let location = useLocation();

  const { state } = location;

  const [badgeData, setBadgeData] = useState(state?.data);

  const [selectedCategory, setSelectedCatgory] = useState("");

  const [badgeImage, setBadgeImage] = useState(null);

  const [badgeImageData, setBadgeImageData] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch
  } = useForm({ mode: "onBlur" });

  const onSubmit = () => {

  }
  const bodyMessage = watch("bodyMessage");
  const headerMessage = watch("headerMessage");
  const achievement = watch("achievement");
  const category = watch("category");

  return (
    <>
      <div className="add-replication-container">
        <div className="back-to-user-container">
          <img
            src={assets.Icons.left_icon}
            alt="left-icon"
            className="left-icon"
          />
          <span
            className="back-to-user"
            onClick={() => navigate("/main/replications")}
          >
            Back to Replications
          </span>
        </div>
        <div className="title-add-replication">
          <p className="edit-replication-details">{badgeData ? `Edit Replication` : `Create a new Replication`}</p>
        </div>

        <div className="d-flex ms-2">
          <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <label className="login-input-label">Replication Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxx"
                  register={register("replicationName", {
                    required: "Replication Name is required",
                    maxLength: {
                      value: 50,
                      message: "Replication Name cannot exceed 50 characters"
                    }
                  })}
                  error={errors.replicationName}
                  messages={errors}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <label className="form-title">Source</label>
              </div>
              <div className="col-6">
                <label className="form-title">Destination</label>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-6">
                <label className="login-input-label">Database Type</label>
                <CustomController
                  name="sourceDatabaseType"
                  control={control}
                  data={null}
                  error={errors.sourceDatabaseType}
                  register={register("sourceDatabaseType", dropDownValidation('Source Database Type'))}
                  render={({ field: { onChange } }) => {
                    return (
                      <DropDownComponent
                        options={[]}
                        borderGreen
                        error={errors.sourceDatabaseType}
                        value={null}
                        onChange={(e) => {
                          setSelectedCatgory(e);
                          onChange(e?.value);
                        }}
                        placeholder="Select a Database Type"
                      />
                    );
                  }}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Database Type</label>
                <CustomController
                  name="destDatabaseType"
                  control={control}
                  data={null}
                  error={errors.destDatabaseType}
                  register={register("destDatabaseType", dropDownValidation('Destination Database Type'))}
                  render={({ field: { onChange } }) => {
                    return (
                      <DropDownComponent
                        options={[]}
                        borderGreen
                        error={errors.destDatabaseType}
                        value={null}
                        onChange={(e) => {
                          onChange(e?.value);
                        }}
                        placeholder="Select a Database Type"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Host Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: X.X.X.X"
                  register={register("sHostName", {
                    required: "Host Name is required",
                    maxLength: {
                      value: 50,
                      message: "Replication Name cannot exceed 50 characters"
                    }
                  })}
                  error={errors.sHostName}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Host Name</label>
                <InputField
                  type={"text"}
                   placeholder="Eg: X.X.X.X"
                  register={register("dHostName", {
                    required: "Host Name is required",
                  })}
                  error={errors.dHostName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Port Number</label>
                <InputField
                  type={"number"}
                  placeholder="Eg: 0000"
                  register={register("sPortNumber", {
                    required: "Port Number is required",
                  })}
                  
                  error={errors.sPortNumber}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Bucket</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: Bucket"
                  register={register("bucketName", {
                    required: "Bucket Name is required",
                  })}
                  error={errors.bucketName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">User Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxx"
                  register={register("sUserName", {
                    required: "User Name is required",
                  })}
                  error={errors.sUserName}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">User Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxx"
                  register={register("dUserName", {
                    required: "User Name is required",
                  })}
                  error={errors.dUserName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Password</label>
                <InputField
                  type={"password"}
                  placeholder="Eg: *****"
                  register={register("sPassword", {
                    required: "Password is required",
                  })}
                  rightIcon
                  eyeIcon
                  passwordIcon
                  error={errors.sPassword}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Password</label>
                <InputField
                  type={"password"}
                  placeholder="Eg: *****"
                  register={register("dPassword", {
                    required: "Password is required",
                  })}
                  rightIcon
                  eyeIcon
                  passwordIcon
                  error={errors.dPassword}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Database Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxxx"
                  register={register("sDatabaseName", {
                    required: "Database Name is required",
                  })}
                  error={errors.sDatabaseName}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Database Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxxx"
                  register={register("dDatabaseName", {
                    required: "Database Name is required",
                  })}
                  error={errors.dDatabaseName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6 center-button">
                <PrimaryButton
                  type="button"
                  label={'Show Tables'}
                  onClick={() => { }} />
              </div>
              <div className="col-6 center-button">
                <PrimaryButton
                  type="button"
                  label={'Show Collections'}
                  onClick={() => { }} />
              </div>
            </div>

            <div className="col-12 mt-5 center-button">
              <PrimaryButton
                label={'Save Replication'} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddReplication;