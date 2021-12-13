import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ReactComponent as ViewIcon } from "../../../../Assets/Icon/View.svg";
import { ReactComponent as DeleteIcon } from "../../../../Assets/Icon/Delete.svg";
import "./CustomerTable.css";
import { NavLink, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { viewCustomerService } from '../../../../Services/customerServices';
import Path from "../../../../Constant/RouterConstant";


const headerSortingStyle = { backgroundColor: "#e3edf8" };
function CustomerTable() {
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();
  const { SearchBar } = Search;

  useEffect(() => {
    data();
  }, []);

  const data = () => {
    viewCustomerService()
      .then(function (res) {
        console.log("customer data", res.data.data);
        setCustomerData(res.data.data);
        // customerData.map((items) => localStorage.setItem("id", items.id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
  const columns = [
    {
      dataField: 'sl.no',
      text: 'Serial no.',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   dataField: "createdBy",
    //   text: "Customer ID",
    //   sort: true,
    //   headerSortingStyle,
    //   headerAlign: "center",
    //   align: "center",
    // },
  
    {
      dataField: "fullName",
      text: "Customer Name",
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "email",
      text: "Email",
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "phone",
      text: "Contact No.",
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "createdAt",
      text: "Join Date",
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
          <div className="d-flex justify-content-evenly align-items-center">
             <NavLink to={`${Path.customerDetails}/${row?.id}`}>
              <ViewIcon className="view-icon" />
            </NavLink>
            <DeleteIcon
              className="iconHover delete-icon"
              onClick={() => handleDelete(row.id, row.fullName)}
            />
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "createdBy",
      order: "asc",
    },
  ];



  function handleDelete(rowId, name) {
    confirmAlert({
      title: "Delete",
      message: `Are you sure you want to remove ${name} from this table?`,  
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          color: "red",
          onClick: () => {
            console.log("ROW ID: ", rowId);
            console.log("ROW NAME: ", name);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <div className="table-responsive" style={{ padding: "20px" }}>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          prePageText: "Previous",
          nextPageText: "Next",
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
          ],
        })}
        keyField="createdBy"
        columns={columns}
        data={customerData}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="createdBy"
            columns={columns}
            data={customerData}
            search
          >
            {(toolkitprops) => (
              <>
                <div className="d-flex justify-content-between mb-3">
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
                  data={customerData.map((items) => items)}
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
}

export default CustomerTable;
