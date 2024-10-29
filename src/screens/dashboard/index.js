import React, { useEffect, useState } from "react";
import "./styles.scss";
import DropDownComponent from "../../components/dropDown";
import PrimaryButton from "../../components/primaryButton";
import InputField from "../../components/inputField";
import TableComponent from "../../components/table";

const Dashboard = () => {
  
  const headerDetails = [
    { label: "Content Id" },
    { label: "Title" },
    { label: "Icon" },
    { label: "Media File" },
    { label: "Duration" },
    { label: "Action" },
  ];
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Dashboard</p>
        {/* <DropDownComponent
          options={[{ label: 'Yes', value: "true" },
            { label: 'No', value: "false" }]}/>

            <div className="item"></div>

            <PrimaryButton
              label={'Submit'}/>
              
            <div className="item"></div>

            <InputField
              type={'number'}/>
            <div className="item"></div>

              <TableComponent headerDetails={headerDetails}></TableComponent> */}
      </div>
    </div>
  );
};

export default Dashboard;
