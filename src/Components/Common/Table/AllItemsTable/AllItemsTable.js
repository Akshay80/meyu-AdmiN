import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { AllItemsData } from "./AllItemsData";
import {ReactComponent as EditIcon} from '../../../../Assets/Icon/Edit.svg';
import {ReactComponent as DeleteIcon} from '../../../../Assets/Icon/Delete.svg';
import "./AllItemsTable.css";
import { NavLink } from "react-router-dom";
import Path from "../../../../Constant/RouterConstant";

const AllItemsTable = () => {
  const products = AllItemsData.map((custom) => [
    {
      id: custom.id,
      date: custom.date,
      name: custom.name,
      product: custom.product,
      status: custom.status
    },
  ]);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  const columns = [
    {
      dataField: "id",
      text: "Product ID",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "name",
      text: "Chef Name",
      headerSortingStyle,
      sort: true,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "product",
      text: "Product Name",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
        dataField: "status",
        text: "Status",
        sort: true,
        headerSortingStyle,
        headerAlign: "center",
        align: "center",
      },
      {
        dataField: "link",
        text: "Action",
        headerAlign: "center",
        align: "center",
        formatter: (rowContent, row) => {
          return (
            <div className="d-flex justify-content-evenly">
              <NavLink to={Path.editItems}>
                <EditIcon />
                </NavLink>
            
              <a href="#">
                <DeleteIcon />
              </a>
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
          custom: true,
          totalSize: products.length,
          prePageText: "Previous",
          nextPageText: "Next",
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
              value: products.length,
            },
          ],
          hideSizePerPage: products.length === 0,
        })}
        keyField="id"
        columns={columns}
        data={AllItemsData.map((item) => item)}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={AllItemsData.map((item) => item)}
            search
          >
            {(toolkitprops) => (
              <>
                <div className="d-flex justify-content-between mb-3">
                  <SizePerPageDropdownStandalone {...paginationProps} />
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
                  noDataIndication="No Data Is Available"
                />
                <div className="d-flex justify-content-end">
                  <PaginationListStandalone {...paginationProps} />
                </div>
              </>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </div>
  );
};

export default AllItemsTable;
