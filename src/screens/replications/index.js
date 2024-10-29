import React, { useEffect, useState } from "react";
import "./styles.scss";
import PrimaryButton from '../../components/primaryButton';
import NoData from '../../components/noData';
import TableComponent from '../../components/table';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Replications = () => {

  const navigate = useNavigate();

  const headerDetails = [
    { label: "S No" },
    { label: "Replication Name" },
    { label: "Source" },
    { label: "Destination" },
    { label: "Current O/Ps" },
    { label: "Health" },
    { label: "Action" },
  ];

  const data = useSelector((state) => state?.notification?.userNotifications ?? [])

  
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Replications</p>
      </div>
      <div className="customer-care-search-container ">

        <div className="ms-3">
          <PrimaryButton
            label="ADD NOTIFICATION "
            cancelBtn
            onClick={() => navigate("/main/add-replication")}
          />
        </div>
      </div>
      <div className="users-table-container">
        <TableComponent
          headerDetails={headerDetails}
        >
          {data.length > 0 ? (
            <>
              {data.map((list, index) => {
                let {
                  id,
                  message,
                  staffName,
                  createdAt
                } = list;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{message}</td>
                    <td>{staffName}</td>
                    <td>{'asdasd'}</td>
                  </tr>
                );
              })}
            </>
          ) : <tr>
            <td colSpan={headerDetails.length} className="text-center">
              <NoData />
            </td>
          </tr>
          }
        </TableComponent>
      </div>
    </div>
  );
};

export default Replications;
