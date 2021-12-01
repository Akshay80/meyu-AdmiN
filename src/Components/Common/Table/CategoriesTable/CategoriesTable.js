import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { CategoriesItemsData } from "./CategoriesItemsData";
import { ReactComponent as EditIcon } from "../../../../Assets/Icon/Edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../Assets/Icon/Delete.svg";
import "./CategoryTable.css";
import { confirmAlert } from "react-confirm-alert";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";

const CategoriesTable = () => {
  const [categoryy, setCat] = useState();
  const [subCategoryy, setSubCat] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const products = CategoriesItemsData.map((custom) => [
    {
      serialno: custom.serialno,
      date: custom.date,
      cat: custom.cat,
      subcat: custom.subcat,
    },
  ]);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  const onSubmit = (data) => {
    setCat(data.category);
    setSubCat(data.subcategory);
    console.log(categoryy);
    console.log(subCategoryy);
  };

  function handleDelete(rowId, name) {
    confirmAlert({
      title: "Delete",
      message: `Are you sure you want to remove this item from the table?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          onClick: () => {
            console.log("ROW ID: ", rowId);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }
  const columns = [
    {
      dataField: "serialno",
      text: "Serial No",
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
      dataField: "cat",
      text: "Cuisine",
      headerSortingStyle,
      sort: true,
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
          <div className="d-flex align-items-center justify-content-evenly">
            <EditIcon className="edit-icon mt-1" />
            <DeleteIcon
              className="iconHover delete-icon"
              onClick={() => handleDelete(row.serialno, row.name)}
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
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
          <div className="page-heading-wapper d-flex">
            <BagIcon className="page-icon m-0" />
            <h3 className="page-sec-heading m-0 mx-2">Categories </h3>
          </div>
       
        <div className="d-flex align-items-center ">
          <button
            type="submit"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            <AddIcon /> Add New Categories
          </button>
        </div>
        </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body p-4 pt-0">
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Cuisine
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="category"
                    name="category"
                    placeholder="cuisine"
                    autoComplete="off"
                    {...register("category", {
                      required: "Cuisine is required",
                    })}
                  />
                  {errors.category && (
                    <p className="errors">{errors.category.message}</p>
                  )}
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Sub Categories
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="sub-category"
                    name="sub-category"
                    placeholder="sub category"
                    autoComplete="off"
                    {...register("subcategory", {
                      required: "Sub Category is required",
                    })}
                  />
                  {errors.subcategory && (
                    <p className="errors">{errors.subcategory.message}</p>
                  )}
                </div> */}
                <div className="modal-footer border-0 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Add Categories
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="card">
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
            data={CategoriesItemsData.map((item) => item)}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={CategoriesItemsData.map((item) => item)}
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
      </div>
    </>
  );
};

export default CategoriesTable;
