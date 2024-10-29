import React from "react";
import "./styles.scss";
import ReactPaginate from "react-paginate";
import assets from "../../assets";

const Pagination = (props) => {
  const { totalPage = 1, pageChange } = props;

  const handlePageChange = (page) => {
    pageChange(page);
  };

  return (
    <div className="">
      <div className="">
        <div className="custom-pagination-container">
          <ReactPaginate
            disableInitialCallback={true}
            previousLabel={
              <span>
                <img
                  src={assets.Icons.pagination_left}
                  alt="left-icon"
                  className="pagination-icon"
                />
              </span>
            }
            nextLabel={
              <span>
                <img
                  src={assets.Icons.pagination_right}
                  alt="right-icon"
                  className="pagination-icon"
                />
              </span>
            }
            breakLabel={<span className="pagination-text">...</span>}
            breakClassName=" "
            pageCount={Math.ceil(totalPage)}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={(e) => handlePageChange(e.selected + 1)}
            containerClassName="pagination custom-pagination"
            pageClassName=" custom-page-item"
            pageLinkClassName="custom-page-link"
            activeClassName="pagination-active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="custom-page-link"
            nextLinkClassName="custom-page-link"
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
