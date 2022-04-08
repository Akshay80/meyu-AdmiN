import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  getCustomerDetail,
  getCustomerDetails,
} from "../../../../Services/customerServices";
import "./CustomerOrderTable.css";
import moment from "moment";
import { useParams } from "react-router-dom";

const CustomerOrderTable = () => {
  const [orderData, setorderData] = useState([]);
  const { customerId } = useParams();

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  const columns = [
    // {
    //   dataField: "id",
    //   text: "Order ID",
    //   sort: true,
    //   headerSortingStyle,
    // },
    {
      dataField: "sl.no",
      text: "Serial no.",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      headerSortingStyle,
    },
    {
      dataField: "pickUpTime",
      text: "Date",
      sort: true,
      headerSortingStyle,
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            {moment(row.pickUpTime).format("MMMM Do YYYY")}
          </div>
        );
      },
    },
    {
      dataField: "customerName",
      text: "Chef Name",
      headerSortingStyle,
      sort: true,
    },
    {
      dataField: "chefAddress.street",
      text: "Delivery Address ",
      sort: true,
      headerSortingStyle,
    },
    {
      dataField: "totalAmount",
      text: "Amount",
      sort: true,
      headerSortingStyle,
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            {`$`+ row.totalAmount}
          </div>
        );
      },
    },
    {
      dataField: "orderState",
      text: "Status",
      sort: true,
      headerSortingStyle,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  useEffect(() => {
    fetchcustomerID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchcustomerID = () => {
    getCustomerDetail(customerId)
      .then((response) => {
        console.log(response.data.data)
        fetchCustomerDetail(response.data.data.createdBy);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchCustomerDetail = async (CID) => {
    await getCustomerDetails(CID)
      .then((response) => {
        console.log(response.data.data.convertedOrderDetailsJSON);
        setorderData(response.data.data.convertedOrderDetailsJSON);
      })
      .catch(function (error) {});
  };

  return (
    <div className="table-responsive" style={{ padding: "20px" }}>
      <PaginationProvider
        pagination={paginationFactory({
          custom: false,
          totalSize: orderData.length,
          prePageText: "Previous",
          nextPageText: "Next",
          withFirstAndLast: false,
          page: 1,
          sizePerPageList: [
            {
              text: "5",
              value: 5,
            },

            {
              text: "10",
              value: 10,
            },
            {
              text: "30",
              value: 30,
            },
            {
              text: "50",
              value: 50,
            },
            {
              text: "All",
              value: orderData.length,
            },
          ],
          hideSizePerPage: orderData.length === 0,
        })}
        keyField="id"
        columns={columns}
        data={orderData.map((item) => item)}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={orderData.map((item) => item)}
            search
          >
            {(toolkitprops) => (
              <>
                <div className="d-flex justify-content-end mb-3">
                  <SizePerPageDropdownStandalone {...paginationProps} />
                  <SearchBar
                    className="ms-2"
                    {...toolkitprops.searchProps}
                    srText=" "
                  />
                </div>
                <BootstrapTable
                  {...toolkitprops.baseProps}
                  {...paginationTableProps}
                  defaultSorted={defaultSorted}
                  defaultSortDirection="asc"
                  wrapperClasses="table-responsive"
                  hover
                  striped
                  condensed={false}
                  noDataIndication="No Data Is Available"
                />
                {/* <div className="d-flex justify-content-end">
                  <PaginationListStandalone {...paginationProps} />
                </div> */}
              </>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </div>
  );
};

export default CustomerOrderTable;
