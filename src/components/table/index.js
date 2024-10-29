import React, { useState } from "react";
import "./styles.scss";
import Pagination from "../pagination";
import assets from "../../assets";
import InfoToolTip from "../infoToolTip";
import moment from "moment";

const TableComponent = ({
  headerDetails,
  children,
  subscriptionTable,
  pagination,
  totalPages = 0,
  page = 1,
  onPageChange,
  showPagination,
  onClickSave,
  isBorder = false
}) => {
  const hasData = children?.props?.children?.length > 0;

  const userIdLeft = hasData ? 98 : 40;
  const userNameLeft = hasData ? 196 : 105;


  return (
    <div className="table-container" style={{
        border: isBorder ? "1px solid rgb(203, 203, 203)" : "none",
        borderRadius:5
    }}>
      <div className="table-scroll">
        <table className="main-table" cellSpacing={0}>
          <thead
            className={`${subscriptionTable
              ? "subscription-table-header"
              : "normal-table-header"
              }`}
          >
            <tr>
              {headerDetails.map((header, index) => (
                <th
                  key={index}
                  className={`${header.fixedCheckbox
                    ? "checkbox-sticky-container"
                    : header.fixedUserId
                      ? "userId-sticky-container"
                      : header.fixedUserName
                        ? "username-column"
                        : ""
                    } `}
                  style={{
                    left:
                      header.fixedUserId && userIdLeft
                        ? `${userIdLeft}px`
                        : header.fixedUserName && userNameLeft
                          ? `${userNameLeft}px`
                          : undefined,
                  }}
                >
                  <div className="table-header-custom">
                    {header.label}
                    {header.notificationIcon && (
                      <div>
                        <InfoToolTip content={header?.notificationIcon} />
                      </div>
                    )}
                  </div>

                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {(pagination && totalPages != 0) && (
        <div
          className={`${showPagination
            ? "d-flex text-center flex-column mt-1"
            : "d-flex justify-content-between mt-3"
            }`}
        >
          <span className={`show-text ${showPagination ? "col-md-12" : ""}`}>
            {" "}
            Showing {(page * 10) - (10 - 1)} - {page * 10} of {10 * totalPages}
          </span>
          <div
            className={`${showPagination ? "users-pagination" : "table-pagination"
              }`}
          >
            <Pagination
              pageChange={(page) => { onPageChange(page) }}
              totalPage={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
