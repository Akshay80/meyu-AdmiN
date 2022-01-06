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
import "./ChefTable.css";
import Path from "../../../../Constant/RouterConstant";
import { NavLink } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { chefDetailsService, deleteChef } from "../../../../Services/chefServices";
import { toast } from "react-toastify";

const ChefTable = () => {
  const [chef, setChef] = useState([]);

  useEffect(() => {
    data();
  }, []);

  const data = () => {
    chefDetailsService()
      .then(function (res) {
        setChef(res.data.data);
      })
      .catch(function (error) {});
  };

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  function handleDelete(rowId, name) {
    confirmAlert({
      title: "Delete",
      message: `Are you sure you want to remove ${name} from this table?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          onClick: () => { deleteChef(rowId).then((response) => {
            toast.success(response.data.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            data();
          });
        },
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  }
  const columns = [
    // {
    //   dataField: "sl.no",
    //   text: "Serial no.",
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return rowIndex + 1;
    //   },
    //   sort: true,
    //   headerSortingStyle,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      dataField: "createdBy",
      text: "Chef ID",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },

    {
      dataField: "fullName",
      text: "Chef Name",
      headerSortingStyle,
      sort: true,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "phone",
      text: "Contact No.",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "verificationDate",
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
            <NavLink to={`${Path.chefDetails}/${row.id}`}>
              <ViewIcon className="view-icon" />
            </NavLink>

            <DeleteIcon
              className="iconHover delete-icon"
              onClick={() => handleDelete(row.createdBy, row.fullName)}
            />
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
        keyField="id"
        columns={columns}
        data={chef}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider keyField="id" columns={columns} data={chef} search>
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
                  data={chef}
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

export default ChefTable;
