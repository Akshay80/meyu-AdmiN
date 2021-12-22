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
import { getAllItemsList } from "../../../../Services/itemsService.js";
import { useForm } from "react-hook-form";

const AllItemsTable = () => {
  const [getItem, setgetItem] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    getAllItemsList()
      .then((res) => {
        console.log("datatta", res?.data);
        setgetItem(res?.data?.data);
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
          // onClick: () => {
          // }
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  }
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
      dataField: "dishName",
      text: "Product Name",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "tags",
      text: "Tags",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },

    {
      dataField: "totalCostOfRecipe",
      text: "Price",
      headerSortingStyle,
      sort: true,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "isVerified",
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
          <div className="d-flex justify-content-evenly align-items-center">
            <NavLink to={Path.editItems}>
              <EditIcon className="edit-icon" />
            </NavLink>

            <DeleteIcon
              className="iconHover delete-icon"
              onClick={() => handleDelete(row.id, row.name)}
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
        data={getItems}
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
