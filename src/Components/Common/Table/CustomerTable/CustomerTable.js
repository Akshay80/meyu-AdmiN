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
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axiosConfig from "../../APIConfig/axiosConfig";
const headerSortingStyle = { backgroundColor: "#e3edf8" };

function CustomerTable() {
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();
  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "createdBy",
      text: "Customer ID",
      sort: true,
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
      dataField: "link",
      text: "Action",
      headerAlign: "center",
      align: "center",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex justify-content-evenly align-items-center">
            <ViewIcon
              className="view-icon"
              onClick={() => handleView(row.id, row.createdBy)}
            />

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

  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    await axiosConfig
      .get("admin/getusers", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setCustomerData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function handleView(rowId, rowcreatedBy) {
    console.log(rowId);
    console.log(rowcreatedBy);
    localStorage.setItem("ids", rowId);
    localStorage.setItem("custId", rowcreatedBy);
    navigate("/customer-details");
  }

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
