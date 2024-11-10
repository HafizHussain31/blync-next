import React, { useEffect, useState } from "react";
import "./styles.scss";
import PrimaryButton from '../../components/primaryButton';
import NoData from '../../components/noData';
import TableComponent from '../../components/table';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReplicationData } from "../../redux/reducers/replicationSlice";
import moment from "moment";
import ActionTooltipComponent from "../../components/actionTooltip";
import TextToolTip from "../../components/textToolTip";

const Replications = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const headerDetails = [
    { label: "S No" },
    { label: "Connection Name" },
    { label: "Source" },
    { label: "Destination" },
    { label: "Topics" },
    { label: "Created By" },
    { label: "Created At" },
    { label: "Action" },
  ];

  const data = useSelector((state) => state?.replication?.data ?? []);

  useEffect(() => {
    dispatch(getReplicationData());
  }, []);

  const onClickEdit = (id) => {

  }

  const onClickDelete = (id) => {

  }
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Replications</p>
      </div>
      <div className="customer-care-search-container ">

        <div className="ms-3">
          <PrimaryButton
            label="ADD REPLICATION"
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
                  connectionName,
                  createdBy,
                  createdDate,
                  destination,
                  isActive,
                  source,
                  topics
                } = list;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{connectionName}</td>
                    <td>{source}</td>
                    <td>{destination}</td>
                    {/* <td>{topics && typeof topics == 'string' && topics.length < 10 ? topics : <TextToolTip
                      text={topics?.slice(1,10)+ "..."}
                      tooltipText={topics}/>}</td> */}

                    <td>{topics ?? '--'}</td>
                    <td>{createdBy}</td>
                    <td>{createdDate ? moment(createdDate).format("DD MMM YYYY") : ''}</td>
                    <td align="center">
                      <ActionTooltipComponent
                        onClickEdit={() => onClickEdit(list)}
                        onClickDelete={() => onClickDelete(list)} />
                    </td>
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
