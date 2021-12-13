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
import "./Tags.css";
import { confirmAlert } from "react-confirm-alert";
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

const TagsTable = () => {
  const [editTag, setEditTag] = useState([]);
  const [tag, setTag] = useState([]);

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
        console.log("taggsss data", res.data.data);
        setTag(res.data.data);
        {
          res.data.data.map((items) => {
            setValue("tags", items.name);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Adding Tags API
  const onSubmit = (data) => {
    console.log("data", data);
    let params = {
      name: data.tags,
    };
    addTags(params)
      .then((data) => {
        console.log("post profile data", data);
        tagdata();
      })
      .catch((error) => {
        console.log("post data error", error);
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
  const handleEdit = (rowId) => {
    getTagsbyId()
      .then((res) => {
        console.log("handle edit tags data", res.data.data);
        setEditTag(res.data.data);
        {
          res.data.data.map((item) => {
            // console.log("fersfacasghvxa", rowId);
            setValue("name", item.name);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // put tags
  const EditSubmit = (data) => {
    const params = {
      name: data.name,
    };
    editTagsFun(params)
      .then(function (res) {
        console.log("responseeeeeee", res);
        tagdata();
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
    // {
    //   dataField: "id",
    //   text: "ID",
    //   sort: true,
    //   headerSortingStyle,
    //   headerAlign: "center",
    //   align: "center",
    // },
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
              onClick={() => handleEdit(row.id)}
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
        <div className="d-flex align-items-center ">
          <button
            type="submit"
            className="btn btn-secondary"
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
                    id="tags"
                    placeholder="Tags"
                    name="tags"
                    autoComplete="off"
                    {...register("tags", {
                      required: "Tag is required",
                    })}
                  />
                  {errors.tags && (
                    <p className="errors">{errors.tags.message}</p>
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

      {/* Modal for Edit */}
      {/* 
      <Modal
        aria-labelledby="contained-modal-title-2-vcenter"
        centered
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          className="border-0 shadow-none"
          closeButton
        ></Modal.Header>
        <Form onSubmit={handleSubmit(EditSubmit)}>
          <Modal.Body className="p-4 pt-0">
            <Form.Group className="mb-1">
              <Form.Label>Tag name</Form.Label>
              <Form.Control
                type="text"
                placeholder="tag"
                autoComplete="off"
                {...register("name", {
                  required: "Tag is required!",
                })}
              />
            </Form.Group>
            {errors.name && <p className="errors">{errors.name.message}</p>}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="success" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}

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
                    {...register("name")}
                  />
                </div>
                <div className="modal-footer border-0 d-flex justify-content-center">
                  <button
                    type="submit"
                    // data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Update Tag
                  </button>
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
