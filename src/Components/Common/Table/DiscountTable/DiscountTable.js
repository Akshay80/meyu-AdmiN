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
import "./DiscountTable.scss";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Lightbox from "react-image-lightbox";
import {
  getAllCoupans,
  addCoupans,
  editCoupans,
  deleteCoupans,
  getCoupansByID,
  editOfferImage,
  deleteOfferImage,
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
  const [imageError, setImageError] = useState(false);
  const [imageError1, setImageError1] = useState(false);
  const [offerValue, setOffer] = useState(0);
  const [offerImage, setOfferImages] = useState("");
  const [offerImageValue, setOfferImage] = useState();
  const [validInDayValue, setvalidInDay] = useState(0);
  const [apiOfferImage, setAPIOfferImage] = useState("");
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [isOpen, setOpen] = useState(false);
  const url = "http://13.213.151.153:8083/";
  const [myError, SetMyError] = useState("");
  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  const columns = [
    {
      dataField: "id",
      text: "Serial No",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "offerName",
      text: "Coupon Code",
      headerSortingStyle,
      sort: true,
    },

    {
      dataField: "validOfferInDay",
      text: "Validity (in Days)",
      headerSortingStyle,
      sortf: false,
    },

    {
      dataField: "discountValue",
      text: "Discount",
      headerSortingStyle,
      sort: false,
      formatter: (rowContent, row) => {
        return <div className="d-flex">{"$" + row.discountValue}</div>;
      },
    },

    {
      dataField: "imageUrl",
      text: "Offer Image",
      headerSortingStyle,
      sort: false,
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex">
            {row.MediaObjects.map((rows, key) => (
              <input
                key={key}
                type="image"
                className="categoryImages"
                src={url + rows.imageUrl}
                alt="food_image"
                onClick={() => openLightbox(rows.imageUrl)}
              />
            ))}
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
              onClick={() => handleEdits(row.id)}
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

  async function openLightbox(MyUrl) {
    setOpen(true);
    await setAPIOfferImage(url + MyUrl);
  }

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
    setOffer(data.offer.toUpperCase());
    setOfferImages(data.myimageFile[0]);
    setvalidInDay(data.validity);
    // api will work
    // handleclose the modal

    // Commented greater than 50$ discount code

    // if (data.discount > 50) {
    //   confirmDiscount(data.discount, offerImage, offerValue, validInDayValue);
    // } else {
    var formdata = new FormData();
    formdata.append("offerName", data.offer.toUpperCase());
    formdata.append("discountValue", data.discount);
    formdata.append("offer", data.myimageFile[0]);
    formdata.append("validOfferInDay", data.validity);

    addCoupans(formdata)
      .then((res) => {
        // setAPIOfferImage(
        //   `http://13.213.151.153:8083/${res.data.data.MediaObject.imageUrl}`
        // );
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
        } else {
          console.log(res);
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

  // Sending Discount more than 50% value.
  // const handleDiscount = (discount, myimageFile, offer, validity) => {
  //   console.log(offerImage);
  //   var formdata = new FormData();
  //   formdata.append("offerName", offerValue);
  //   formdata.append("discountValue", discount);
  //   formdata.append("offer", offerImage);
  //   formdata.append("validOfferInDay", validInDayValue);
  //   addCoupans(formdata)
  //     .then((res) => {
  //       if (res.data.success === true) {
  //         handleClose();
  //         toast.success("Coupon Added Successfully", {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           progress: 0,
  //           toastId: "my_toast",
  //         });
  //         discountdata();
  //       } else {
  //         toast.error(res.data.error.messgae, {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           progress: 0,
  //           toastId: "my_toast",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error, {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: false,
  //         progress: 0,
  //         toastId: "my_toast",
  //       });
  //     });
  // };

  // // Alert on Editing
  // const handleDiscount2 = (discount, id, offer, days) => {
  //   let param = {
  //     id: id,
  //     discountValue: discount,
  //     offerName: offer,
  //     validOfferInDay: days,
  //   };
  //   editCoupans(param)
  //     .then((res) => {
  //       if (res.data.success === true) {
  //         handleClose2();
  //         toast.success("Coupon edited Successfully", {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           progress: 0,
  //           toastId: "my_toast",
  //         });
  //         discountdata();
  //       } else {
  //         toast.error(res.data.error.messgae, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           progress: 0,
  //           toastId: "my_toast",
  //         });
  //       }
  //     })

  //     .catch(function (error) {});
  // };

  // Deleting discount API
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

  // const confirmDiscount = (discount) => {
  //   handleClose();
  //   confirmAlert({
  //     title: "Discount",
  //     message: `Are you sure you want to give more than $50 discount?`,
  //     buttons: [
  //       {
  //         label: "Yes",
  //         className: "btn btn-danger",
  //         onClick: () => {
  //           handleDiscount(discount);
  //         },
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {
  //           handleShow();
  //         },
  //       },
  //     ],
  //   });
  // };

  // // Editing Confirm Alert

  // const confirmDiscount2 = (discount, id, offerName, days) => {
  //   handleClose2();
  //   confirmAlert({
  //     title: "Discount",
  //     message: `Are you sure you want to give more than $50 discount?`,
  //     buttons: [
  //       {
  //         label: "Yes",
  //         className: "btn btn-danger",
  //         onClick: () => {
  //           handleDiscount2(discount, id, offerName, days);
  //         },
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {
  //           handleShow2();
  //         },
  //       },
  //     ],
  //   });
  // };

  // edit discount = open modal and display items
  const handleEdits = (rowId) => {
    handleShow2();
    reset();
    getCoupansByID(rowId)
      .then((res) => {
        setValue("offer", res.data.data.offerName);
        setValue("discount", res.data.data.discountValue);
        setValue("validity", `${res.data.data.validOfferInDay}`);
        setValue("id", res.data.data.id);
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

  const EditedData = (data) => {
    // if (
    //   data.myimageFile[0].type === "image/jpeg" ||
    //   data.myimageFile[0].type === "image/png" ||
    //   data.myimageFile[0].type === "image/jpg"
    // ) {
    //   setImageError1(false);
    // if (data.discount > 50) {
    //   confirmDiscount2(data.discount, data.id, data.offer, data.validity);
    // } else {

    var formData2 = new FormData();
    formData2.append("id", data.id);
    formData2.append("offer", data.myimageFile[0]);

    // Image Update API
    editOfferImage(formData2)
      .then((response) => {
        const param = {
          offerName: data?.offer,
          discountValue: data?.discount,
          validOfferInDay: data?.validity,
          id: data?.id,
        };
        editCoupans(param)
          .then((res) => {
            console.log("response at Line 374: ", res.data.data);
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
          .catch(function (error) {
            console.log("error", error);
          });
      })
      .catch(function (error) {
        if (error.error !== null) {
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
        }
      });
    // }
    // } else {
    //   setImageError1(true);
    // }
  };

  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Offers</h3>
        </div>
        <div className="add-btn d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleShow}
          >
            {" "}
            <AddIcon /> Add New Offer
          </button>
        </div>
      </div>

      {/* ============================== Modal for adding tag ========================= */}

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header
          className="border-0 shadow-none outline-0"
          closeButton
        ></Modal.Header>
        <Form onSubmit={handleSubmit(onSubmits)}>
          <Modal.Body className="p-4 pt-0">
            <Form.Group className="mb-1">
              <Form.Label>Offer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter the coupon code (Max Length: 10 characters)"
                autoComplete="off"
                style={{ textTransform: "uppercase" }}
                {...register("offer", {
                  required: "Offer Name is required!",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Special Characters are not allowed!",
                  },
                  maxLength: {
                    value: 10,
                    message: "Only 10 characters are allowed!",
                  },
                })}
              />
            </Form.Group>
            {errors.offer && <p className="errors">{errors.offer.message}</p>}

            <Form.Group className="mb-1 mt-3">
              <Form.Label>Discount Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter the discount value in numbers"
                autoComplete="off"
                {...register("discount", {
                  required: "Discount is required!",
                  pattern: {
                    value: /^[1-9]/,
                    message: "Invalid Discount!",
                  },
                  max: {
                    value: 100,
                    message: "Cannot give more than $100 discount!",
                  },
                })}
              />
            </Form.Group>
            {errors.discount && (
              <p className="errors">{errors.discount.message}</p>
            )}

            <Form.Group className="mb-1 mt-3">
              <Form.Label>Offer Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                id="formFile"
                {...register("myimageFile", {
                  required: "Please provide an image!",
                })}
              />
            </Form.Group>
            {errors.myimageFile && (
              <p className="errors">{errors.myimageFile.message}</p>
            )}
            {/* {imageError ? (
              <p className="errors">
                Not a valid image. Only .JPEG, .JPG and .PNG images are allowed!
              </p>
            ) : null} */}

            {/* <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Default file input example</Form.Label>
    <Form.Control type="file" />
  </Form.Group> */}

            <Form.Group className="mt-3">
              <Form.Label>Validity (in Days)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please provide validity Days in numbers only"
                autoComplete="off"
                {...register("validity", {
                  required: "Please provide an validity!",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only Numbers are allowed",
                  },
                })}
              />
            </Form.Group>
            <p className="text-muted" style={{ fontSize: 14, lineHeight: 2 }}>
              The coupon will expire after above day.
            </p>
            {errors.validity && (
              <p className="errors">{errors.validity.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Offer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {isOpen === true ? (
        <Lightbox
          mainSrc={apiOfferImage}
          onCloseRequest={() => setOpen(false)}
        />
      ) : null}

      {/* ============================== Modal for Edit ========================= */}
      <Modal centered show={show2} onHide={handleClose2}>
        <Modal.Header
          className="border-0 shadow-none"
          closeButton
        ></Modal.Header>
        <Form onSubmit={handleSubmit(EditedData)}>
          <Modal.Body className="p-4 pt-0">
            <Form.Group className="mb-1">
              <Form.Label>Offer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter the coupon code (Max Length: 10 characters)"
                autoComplete="off"
                style={{ textTransform: "uppercase" }}
                {...register("offer", {
                  required: "Offer Name is required!",
                  pattern: {
                    value: /^[A-Za-z0-9 ]+$/,
                    message: "Special Characters are not allowed!",
                  },
                  maxLength: {
                    value: 10,
                    message: "Only 10 characters are allowed!",
                  },
                })}
              />
            </Form.Group>
            {errors.offer && <p className="errors">{errors.offer.message}</p>}

            <Form.Group className="mb-1 mt-3">
              <Form.Label>Discount Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter the discount value in numbers"
                autoComplete="off"
                {...register("discount", {
                  required: "Discount is required!",
                  pattern: {
                    value: /^[1-9]/,
                    message: "Invalid Discount!",
                  },
                  max: {
                    value: 100,
                    message: "Cannot give more than $100 discount!",
                  },
                })}
              />
            </Form.Group>
            {errors.discount && (
              <p className="errors">{errors.discount.message}</p>
            )}

            <Form.Group className="mb-1 mt-3">
              <Form.Label>Offer Image</Form.Label>
              <Form.Control
                type="file"
                id="formFile"
                accept="image/x-png,image/jpg,image/jpeg"
                {...register("myimageFile", {
                  required: "Please provide an image!",
                })}
              />
            </Form.Group>
            {errors.myimageFile && (
              <p className="errors">{errors.myimageFile.message}</p>
            )}
            {/* {imageError1 ? (
              <p className="errors">
                Not a valid image. Only .JPEG, .JPG and .PNG images are allowed!
              </p>
            ) : null} */}

            <Form.Group className="mt-3">
              <Form.Label>Validity (in Days)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please provide validity days in numbers only"
                autoComplete="off"
                {...register("validity", {
                  required: "Please provide an validity!",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only Numbers are allowed",
                  },
                })}
              />
            </Form.Group>
            <p className="text-muted" style={{ fontSize: 14, lineHeight: 2 }}>
              The coupon will expire after above day.
            </p>
            {errors.validity && (
              <p className="errors">{errors.validity.message}</p>
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
              custom: false,
              prePageText: "Previous",
              nextPageText: "Next",
              withFirstAndLast: false,
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
                  value: coupans.length,
                },
              ],
              hideSizePerPage: coupans.length === 0,
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
                    <div className="d-flex justify-content-end mb-3">
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
