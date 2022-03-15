import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { chefOrderData } from "./ChefOrderData";
import "./ChefOrderTable.css";

const ChefOrderTable = () => {
  const products = chefOrderData.map((custom) => [
    {
      id: custom.id,
      date: custom.date,
      name: custom.name,
      address: custom.address,
      amount: custom.amount,
      status: custom.status,
    },
  ]);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

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
      dataField: "date",
      text: "Date",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "name",
      text: "Customer Name",
      headerSortingStyle,
      sort: true,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "address",
      text: "Delivery Address ",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
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
          totalSize: products.length,
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
              value: products.length,
            },
          ],
          hideSizePerPage: products.length === 0,
        })}
        keyField="id"
        columns={columns}
        data={chefOrderData.map((item) => item)}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={chefOrderData.map((item) => item)}
            search
          >
            {(toolkitprops) => (
              <>
                <div className="d-flex justify-content-end mb-3">
                  {/* <SizePerPageDropdownStandalone {...paginationProps} /> */}
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

export default ChefOrderTable;