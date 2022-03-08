import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ReactComponent as EditIcon } from "../../../../Assets/Icon/Edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../Assets/Icon/Delete.svg";
import "./AllItemsTable.css";
import { NavLink } from "react-router-dom";
import Path from "../../../../Constant/RouterConstant";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  getAllItemsList,
  deleteItemsbyId,
} from "../../../../Services/itemsService.js";
import { toast } from "react-toastify";

const AllItemsTable = () => {
  const [getItem, setgetItem] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    getAllItemsList()
      .then((res) => {
        setgetItem(res?.data?.data);
      })
      .catch(function (error) {});
  };

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  const handleDelete = (rowId) => {
    deleteItemsbyId(rowId)
      .then((res) => {
        toast.success("Item Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        getItems();
      })
      .catch((error) => {});
  };
  const confirmDelete = (rowId) => {
    confirmAlert({
      title: "Delete",
      message: `Are you sure you want to remove item from this table?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          onClick: () => {
            handleDelete(rowId);
          },
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const columns = [
    {
      dataField: "id",
      text: "Product ID",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },

    {
      dataField: "dishName",
      text: "Product Name",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },

    {
      dataField: "costPerServing",
      text: "Price",
      headerSortingStyle,
      sort: true,
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            {row.currencySymbol + row.costPerServing}
          </div>
        );
      },
      // headerAlign: "center",
      // align: "center",

    },
    {
      dataField: "isVerified",
      text: "Status",
      sort: true,
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
      formatter: (rowContent, row) => {
        return(row.isVerified === true?
        <p>Approved</p>:<p>Pending</p>
        )}
            

    },
    {
      dataField: "link",
      text: "Action",
      // headerAlign: "center",
      // align: "center",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            <NavLink to={`${Path.editItems}/${row.id}`}>
              <EditIcon className="edit-icon" />
            </NavLink>

            <DeleteIcon
              className="iconHover delete-icon"
              onClick={() => confirmDelete(row.id)}
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
      className="dropdown-toggle"
        pagination={paginationFactory({
          custom: true,
          withFirstAndLast: false,
          totalSize: getItem.length,
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
          hideSizePerPage: getItem.length === 0,
          
        })}
        keyField="id"
        columns={columns}
        data={getItem}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            columns={columns}
            data={getItem}
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
                  data={getItem}
                  condensed={false}
                  bootstrap4
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
