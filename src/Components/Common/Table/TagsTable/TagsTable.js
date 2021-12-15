import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ReactComponent as EditIcon } from "../../../../Assets/Icon/Edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../Assets/Icon/Delete.svg";
import "./Tags.scss";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";
import {
  addTags,
  deleteTags,
  getAllTagFun,
  getTagsbyId,
  editTagsFun,
} from "../../../../Services/tagServices";
import { useParams } from "react-router-dom";

const TagsTable = () => {
  const [editId, setEditId] = useState();
  const [tag, setTag] = useState([]);

  const { rowId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    tagdata();
  }, []);

  const tagdata = () => {
    getAllTagFun()
      .then((res) => {
        console.log("taggsss data", res?.data?.data);
        setTag(res?.data?.data);
        // {
        //   res.data.data.map((items) => {
        //     // setValue("tags", items.tags);
        //   });
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Adding Tags API
  const onSubmit = (data) => {
    let params = {
      name: data?.name,
    };
    addTags(params)
      .then((data) => {
        console.log("tagggas addded", data);
        if(data?.statusText === "Created") {
          toast.success("Tag Added Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          tagdata();
        }
      })
      .catch((error) => {
        toast.error(error.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      });
  };

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  // Deleting tag API
  const handleDelete = (rowId) => {
    let params = {
      id: rowId,
    };
    deleteTags(params)
      .then((data) => {
        console.log("post tag id deleted data", data);
        toast.success("Tag Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        tagdata();
      })
      .catch((error) => {
        console.log("post data error", error);
      });
  };

  const confirmDelete = (rowId) => {
    confirmAlert({
      title: "Delete",
      message: `Are you sure you want to remove this item from the table?`,
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
        },
      ],
    });
  };

  // edit tags = open modal and display items
  const handleEdit = (rowId, rowName) => {
    getTagsbyId(rowId)
      .then((res) => {
        setValue("tags", rowName);
        console.log("rowididid", rowName);
        setEditId(res?.data?.data);
        console.log("handle edit tags data", res.data.data);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      });
  };

  // useEffect(() => {
  //   setValue("tags", tagDetail?.name);
  // }, [tagDetail]);

  // const getTagDetail = (id, name) => {
  //   setTagDetail({ id: id, name: name });
  // };

  // // put api to edit tags

  const EditSubmit = (tagss) => {
    const param = {
      id: editId?.id,
      name: tagss?.tags,
    };
    editTagsFun(param)
    .then((res) => {
        console.log("edited params", res);
        // if(res?.statusText === 'OK') {
          toast.success("Tag edited Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          tagdata();
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      dataField: "serialno",
      text: "Serial No",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "name",
      text: "Name",
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
          <div className="d-flex justify-content-evenly">
            <EditIcon
              className="mt-1 edit-icon"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              onClick={() => handleEdit(row.id, row.name)}
            />
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
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Tags </h3>
        </div>
        <div className="add-btn d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-secondary "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            {" "}
            <AddIcon /> Add New Tags
          </button>
        </div>
      </div>
      {/* ============================== Modal for adding tag ========================= */}
      <div
        className="modal fade"
        id="exampleModal1"
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
            <div className="modal-body p-4 pt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Tags Name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="name"
                    placeholder="name"
                    name="name"
                    autoComplete="off"
                    {...register("name", {})}
                  />
                  {errors.name && (
                    <p className="errors">{errors?.name?.message}</p>
                  )}
                </div>
                <div className="modal-footer border-0 d-flex justify-content-center">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Add Tags
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ============================== Modal for Edit ========================= */}
      <div
        className="modal fade"
        id="exampleModal2"
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
            <div className="modal-body p-4 pt-0">
              <form onSubmit={handleSubmit(EditSubmit)}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Edit Tag
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="tags"
                    name="tags"
                    autoComplete="off"
                    {...register("tags", {})}
                  />
                    {errors.tags && (
                    <p className="errors">{errors?.tags?.message}</p>
                  )}
                </div>
                <div className="border-0 d-flex">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success"
                  >
                    Update
                  </button>
                <button type="button" className="btn btn-dark ms-3" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =====================modal end============= */}

      <div className="card">
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
            data={tag}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={tag}
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
                      data={tag}
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

export default TagsTable;
