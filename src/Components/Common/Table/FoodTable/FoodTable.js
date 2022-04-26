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
import "./Foodtable.css";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getAllFoodFun, addFood, editFoodFun, deleteFood, getFoodbyId } from "../../../../Services/foodService";
import Loader from "../../../../Assets/Icon/loading.gif";

const FoodTable = () => {
  const [editId, setEditId] = useState();
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset();
    setShow(true);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  useEffect(() => {
    tagdata();
  }, []);

  const tagdata = () => {
  setLoading(true);
  setTimeout(() => {
    getAllFoodFun()
      .then((res) => {
        setLoading(false);
        setFood(res?.data?.data);
      })
      .catch(function (error) {});
  }, 1000);
       
  };

  // Adding Tags API
  const onSubmits = (data) => {
    let params = {
      name: data?.food,
    };
    addFood(params)
      .then((data) => {
        if (data?.statusText === "Created") {
          handleClose();
          toast.success("Food Filter Added Successfully", {
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

  // Deleting tag API
  const handleDelete = (rowId) => {
    let params = {
      id: rowId,
    };
    deleteFood(params)
      .then((data) => {
        toast.success("Delete food filter category successfully!", {
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
      .catch((error) => {});
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

//   edit tags = open modal and display items
  const handleEdits = (rowId, rowName) => {
    handleShow2();
    reset();
    getFoodbyId(rowId)
      .then((res) => {
        setValue("food", rowName);
        setEditId(res?.data?.data);
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

  const EditSubmits = (data) => {
    const param = {
      id: editId?.id,
      name: data?.food,
    };
    editFoodFun(param)
      .then((res) => {
        if (res?.statusText === "OK") {
          handleClose2();
          toast.success("Food Filter Edited Successfully", {
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
      .catch(function (error) {
        toast.error(error.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      });
  };

  const columns = [
    {
      dataField: "serialno",
      text: "Serial No",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "name",
      text: "Name",
      headerSortingStyle,
      sort: true,
      // headerAlign: "center",
      // align: "center",
    },

    {
      dataField: "link",
      text: "Action",
      // headerAlign: "center",
      // align: "center",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            <EditIcon
              className="mt-1 edit-icon"
              onClick={() => handleEdits(row.id, row.name)}
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
      dataField: "serialno",
      order: "asc",
    },
  ];

  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Food Type</h3>
        </div>
        <div className="add-btn d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleShow}
          >
            {" "}
            <AddIcon /> Add New Food Type
          </button>
        </div>
      </div>
      {/* ============================== Modal for adding tag ========================= */}

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header
          className="border-0 shadow-none"
          closeButton
        ></Modal.Header>
        <Form onSubmit={handleSubmit(onSubmits)}>
          <Modal.Body className="p-4 pt-0">
            <Form.Group className="mb-1">
              <Form.Label>Food Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Food Type"
                autoComplete="off"
                {...register("food", {
                  required: "Food type is required!",
                  // pattern: 
                  // {
                  //     value: /^[a-zA-Z ]*$/,
                  //     message: "Invalid Food Filter!"
                  // },
                  // maxLength:
                  // {
                  //     value: 25,
                  //     message: "Minimum 25 characters are allowed!"
                  // }
                })}
              />
            </Form.Group>
            {errors.food && <p className="errors">{errors.food.message}</p>}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Food Type
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ============================== Modal for Edit ========================= */}

      <Modal centered show={show2} onHide={handleClose2}>
        <Modal.Header
          className="border-0 shadow-none"
          closeButton
        ></Modal.Header>
        <Form onSubmit={handleSubmit(EditSubmits)}>
          <Modal.Body className="p-4 pt-0">
            <Form.Group className="mb-1">
              <Form.Label>Edit Food Type</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                {...register("food", {
                  required: "Food type is required!",
                  // pattern: {
                  //   value: /^[a-zA-Z ]*$/,
                  //   message: "Only alphabets are allowed!",
                  // },
                  // maxLength:
                  // {
                  //     value: 25,
                  //     message: "Minimum 25 characters are allowed!"
                  // }
                })}
              />
            </Form.Group>
            {errors.food && <p className="errors">{errors.food.message}</p>}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="success" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* =====================modal end============= */}

      {/* ================= */}
      <div className="card">
        <div className="table-responsive" style={{ padding: "20px" }}>
          <PaginationProvider
            pagination={paginationFactory({
              custom: false,
              prePageText: "Previous",
              nextPageText: "Next",
              withFirstAndLast: false,
              sizePerPage: 5,
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
                  value: food.length,
                },
              ],
              hideSizePerPage: food.length === 0,
            })}
            keyField="serialno"
            columns={columns}
            data={food}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="serialno"
                columns={columns}
                data={food}
                search
              >
                {(toolkitprops) => (
                  <>
                    <div className="d-flex justify-content-end mb-3 me-2">
                      {/* <SizePerPageDropdownStandalone {...paginationProps} /> */}
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
                      bootstrap4
                      data={food}
                      condensed={false}
                      noDataIndication={loading?<img src={Loader} alt="loader" width={24} />:"No Data Is Available"}
                    />
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

export default FoodTable;
