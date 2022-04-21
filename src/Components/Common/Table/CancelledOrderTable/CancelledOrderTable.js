
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { getAllCancelledOrders } from "../../../../Services/orderService";
import { ReactComponent as ViewIcon } from "../../../../Assets/Icon/View.svg";
import "./CancelledOrder.css";
import Path from "../../../../Constant/RouterConstant";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Loader from "../../../../Assets/Icon/loading.gif";

const CancelledOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // const products = OrdersData.map((custom) => [
  //   {
  //     id: custom.id,
  //     date: custom.date,
  //     customername: custom.customername,
  //     chefname: custom.chefname,
  //     amount: custom.amount,
  //     status: custom.status,
  //   },
  // ]);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  useEffect(() => {
    orderData();
  }, []);

  const orderData = async () => {
    setLoading(true)
    setTimeout(() => {
      getAllCancelledOrders()
      .then((response) => {
        setLoading(false);
        setOrders(response.data.data);
      })
      .catch(function (error) {});
    }, 1000);
    
  };

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "updatedAt",
      text: "Date",
      sort: true,
      headerSortingStyle,
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            {moment(row.updatedAt).format("MMMM Do YYYY")}
          </div>
        );
      },
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "customerName",
      text: "Customer Name",
      headerSortingStyle,
      sort: true,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "cookName",
      text: "Chef Name",
      headerSortingStyle,
      sort: true,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "totalAmount",
      text: "Amount",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
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
      // headerAlign: "center",
      // align: "center",
    },

    {
      dataField: "link",
      text: "Action",
      // headerAlign: "center",
      // align: "center",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            <NavLink to={`${Path.orderDetails}/${row.id}`}>
              <ViewIcon className="view-icon" />
            </NavLink>
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  return (
    <div className="table-responsive" style={{ padding: "20px" }}>
      <PaginationProvider
        pagination={paginationFactory({
          custom: false,
          totalSize: orders.length,
          prePageText: "Previous",
          nextPageText: "Next",
          withFirstAndLast: false,
          page: 1,
          sizePerPage: 4,
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
              value: orders.length,
            },
          ],
          hideSizePerPage: orders.length === 0,
        })}
        keyField="id"
        columns={columns}
        data={orders.map((item) => item)}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={orders.map((item) => item)}
            search
          >
            {(toolkitprops) => (
              <>
                <div className="d-flex justify-content-end mb-3">
                  {/* <SizePerPageDropdownStandalone {...paginationProps} /> */}
                  <SearchBar {...toolkitprops.searchProps} srText=" " />
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
                  bootstrap4={true}
                  noDataIndication={loading?<img src={Loader} alt="loader" width={24} />:"No Data Is Available"}
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

export default CancelledOrderTable;
