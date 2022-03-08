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
import "./DiscountTable.css";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  getAllCoupans,
  addCoupans,
  editCoupans,
  deleteCoupans,
  getCoupansByID,
} from "../../../../Services/discountServices";

const DiscountTable = () => {
  const [coupans, setCoupans] = useState([]);

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

  const columns = [
    {
      dataField: "id",
      text: "Serial No",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "couponCode",
      text: "Coupon Code",
      headerSortingStyle,
      sort: true,
    },

    {
      dataField: "discountValue",
      text: "Discount",
      headerSortingStyle,
      sort: true,
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            {"$"+row.discountValue}
          </div>
        );
      },
    },

    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            <EditIcon
              className="mt-1 edit-icon"
              onClick={() => handleEdits(row.id, row.discountValue)}
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

  //   Getting Discount Data
  useEffect(() => {
    discountdata();
  }, []);

  const discountdata = () => {
    getAllCoupans()
      .then((res) => {
        setCoupans(res.data.data);
      })
      .catch(function (error) {});
  };

  // Adding Discount API
  const onSubmits = (data) => {
    if(data.discount > 50)
    {
      confirmDiscount(data.discount);
    }
    else
    {
     let params = {
        discountValue: data?.discount,
      }
      addCoupans(params)
      .then((res) => {
        if (res.data.success === true) {
          handleClose();
          toast.success("Coupon Added Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          discountdata();
        }
        else
        {
          toast.error(res.data.error.messgae, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })
      
      .catch((error) => {
        toast.error(error, {
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
    }
  };

  // Sending Discount more than 50% value.
  const handleDiscount = (discount) => {
    // console.log(discount);
    let params = {
      discountValue: discount,
    }
    addCoupans(params)
      .then((res) => {
        if (res.data.success === true) {
          handleClose();
          toast.success("Coupon Added Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          discountdata();
        }
        else
        {
          toast.error(res.data.error.messgae, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })
    .catch((error) => {
      toast.error(error, {
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
  }

  // Alert on Editing

  const handleDiscount2 = (discount, id) => {
    let param = {
        id: id,
        discountValue: discount,
      };

      editCoupans(param)
      .then((res) => {
        //   console.log(res.data.error.messgae)
        if (res.data.success === true) {
          handleClose2();
          toast.success("Coupon edited Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          discountdata();
        } else {
          toast.error(res.data.error.messgae, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })

      .catch(function (error) {});
     
  }



  // Deleting tag API
  const handleDelete = (rowId) => {
    let params = {
      id: rowId,
    };
    deleteCoupans(params)
      .then((data) => {
        toast.success("Coupan Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        discountdata();
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

  const confirmDiscount = (discount) => {
    handleClose();
    confirmAlert({
      title: "Discount",
      message: `Are you sure you want to give more than $50 discount?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          onClick: () => {
            handleDiscount(discount);
          },
        },
        {
          label: "No",
          onClick: () => {
            handleShow();
          }
        },
      ],
    });
  };

  // Editing Confirm Alert

  const confirmDiscount2 = (discount, id) => {
    handleClose2();
    confirmAlert({
      title: "Discount",
      message: `Are you sure you want to give more than $50 discount?`,
      buttons: [
        {
          label: "Yes",
          className: "btn btn-danger",
          onClick: () => {
            handleDiscount2(discount, id);
          },
        },
        {
          label: "No",
          onClick: () => {
            handleShow2();
          }
        },
      ],
    });
  };

  // edit discount = open modal and display items
  const handleEdits = (rowId, rowName) => {
    handleShow2();
    reset();
    getCoupansByID(rowId)
      .then((res) => {
        setValue("discount", rowName);
        setValue("id", rowId);
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
    if(data.discount > 50)
    {
      confirmDiscount2(data.discount, data.id);
    }
    else
    {
    const param = {
      id: data?.id,
      discountValue: data?.discount,
    };
    editCoupans(param)
      .then((res) => {
        //   console.log(res.data.error.messgae)
        if (res.data.success === true) {
          handleClose2();
          toast.success("Coupon edited Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          discountdata();
        } else {
          toast.error(res.data.error.messgae, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })
      .catch(function (error) {});
    }
  };

  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Discount</h3>
        </div>
        <div className="add-btn d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleShow}
          >
            {" "}
            <AddIcon /> Add New Discount
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
              <Form.Label>Discount Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter the discount value in numbers"
                autoComplete="off"
                {...register("discount", {
                  required: "Discount is required!", 
                })}
              />
            </Form.Group>
            {errors.discount && (
              <p className="errors">{errors.discount.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Discount
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
              <Form.Label>Discount Value</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                
                {...register("discount", {
                  required: "Discount is required!",
                  pattern: {
                    value: /^[1-9]/,
                    message: "Invalid Discount!",
                  },
                  max: {
                    value: 100,
                    message: "Cannot give more than $100 discount!"
                  }
                })}
              />
            </Form.Group>
            {errors.discount && (
              <p className="errors">{errors.discount.message}</p>
            )}
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
            data={coupans}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={coupans}
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
                      bootstrap4
                      data={coupans}
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

export default DiscountTable;
