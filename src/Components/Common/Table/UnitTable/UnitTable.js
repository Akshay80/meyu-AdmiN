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
import "./UnitTable.css";
import { confirmAlert } from "react-confirm-alert";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";
import {
  postUnits,
  putUnits,
  deleteUnits,
  allUnits,
  singleUnits,
} from "../../../../Services/unitService";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const UnitTable = () => {
  const [unitId, setUnitId] = useState();
  const [unitData, setUnitData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset();
    setShow(true);
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      dataField: "sl no.",
      text: "Serial No",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "unitName",
      text: "Unit Name",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "sortName",
      text: "Quantity",
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
            <EditIcon
              className="edit-icon"
              onClick={() => handleEdit(row.id, row.name)}
            />
            {/* <DeleteIcon
              className="iconHover delete-icon"
              onClick={() => handleDelete(row.id, row.name)}
            /> */}
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

  // ================= get all units ==============
  useEffect(() => {
    units();
  }, []);

  async function units() {
    await allUnits()
      .then(function (res) {
        setUnitData(res.data.data);
      })
      .catch(function (error) {});
  }

  // ==================== add unit ============

  const onSubmit = (data) => {
    const unitData = {
      unitName: data.unitname,
      sortName: data.sortname,
    };
    postUnits(unitData)
      .then(function (res) {
        handleClose();
        toast.success("Unit Added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        units();
        reset();
      })

      .catch(function (error) {
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

  // ================ put unit in modal ===============

  async function handleEdit(rowId) {
    handleShow1();
    reset();
    // Getting Data for Specific category
    await singleUnits(rowId)
      .then(function (response) {
        setUnitId(response.data.data.id);
        setValue("unitname", response.data.data.unitName);
        setValue("sortname", response.data.data.sortName);
      })
      .catch(function (error) {});
  }

  const EditSubmit = (data) => {
    const editData = {
      id: unitId,
      unitName: data.unitname,
      sortName: data.sortname,
    };
    putUnits(editData)
      .then(function (res) {
        handleClose1();
        toast.info("Units Edited Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        units();
      })

      .catch(function (error) {
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

  // ===================== confirm delete unit =============

  function confirmDelete(rowId) {
    const deleteById = {
      id: rowId,
    };
    deleteUnits(deleteById)
      .then(function (res) {
        toast.success("Unit Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        units();
      })
      .catch(function (error) {});
  }

  function handleDelete(rowId, name) {
    confirmAlert({
      title: "Delete",
      message: `Are you sure you want to remove this item from the table?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          onClick: () => {
            confirmDelete(rowId);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Unit </h3>
        </div>

        <div className="d-flex align-items-center my-4">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleShow}
          >
            {" "}
            <AddIcon /> Add New Unit
          </button>
        </div>
      </div>
      {/* Modal for Adding New Unit */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          className="border-0 shadow-none"
          closeButton
        ></Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="p-4 pt-0">
            <Form.Group className="mb-1">
              <Form.Label>Unit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="unit name"
                autoComplete="off"
                {...register("unitname", {
                  required: "Unit Name is required!",
                })}
              />
            </Form.Group>
            {errors.unitname && (
              <p className="errors">{errors.unitname.message}</p>
            )}
            <Form.Group className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="quantity"
                autoComplete="off"
                {...register("sortname", {
                  required: "Quantity is required!",
                })}
              />
            </Form.Group>
            {errors.sortname && (
              <p className="errors">{errors.sortname.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Units
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal for Edit */}

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
              <Form.Label>Unit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="unit name"
                autoComplete="off"
                {...register("unitname", {
                  required: "Unit Name is required!",
                })}
              />
            </Form.Group>
            {errors.unitname && (
              <p className="errors">{errors.unitname.message}</p>
            )}
            <Form.Group className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="quantity"
                autoComplete="off"
                {...register("sortname", {
                  required: "Quantity is required!",
                })}
              />
            </Form.Group>
            {errors.sortname && (
              <p className="errors">{errors.sortname.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="success" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div className="card">
        <div className="table-responsive" style={{ padding: "20px" }}>
          <PaginationProvider
            pagination={paginationFactory({
              custom: true,
              totalSize: unitData.length,
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
                {
                  text: "All",
                  value: unitData.length,
                },
              ],
              hideSizePerPage: unitData.length === 0,
            })}
            keyField="id"
            columns={columns}
            data={unitData}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={unitData}
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
                      data={unitData}
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default UnitTable;
