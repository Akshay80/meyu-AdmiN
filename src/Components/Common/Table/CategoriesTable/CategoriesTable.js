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
// import { ReactComponent as DeleteIcon } from "../../../../Assets/Icon/Delete.svg";
import "./CategoryTable.css";
// import { confirmAlert } from "react-confirm-alert";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";
import {
  viewCategoryService,
  // deleteCategoryService,
} from "../../../../Services/userService";
import {
  category,
  viewCategorybyId,
  editCategoryFun,
} from "../../../../Services/categoryService";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Input } from "reactstrap";

const CategoriesTable = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [categImg, setCategImg] = useState();
  const [catId, setCatId] = useState();
  const [catFile, setCatFile] = useState();
  const [image, setImage] = useState({ preview: "", raw: "" });

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

  const url = "http://13.213.151.153:8081/";
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
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "imageUrl",
      text: "Image",
      headerSortingStyle,
      // headerAlign: "center",
      // align: "center",
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
      dataField: "name",
      text: "Cuisine",
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

  async function openLightbox(MyUrl) {
    setOpen(true);
    await setCategImg(url + MyUrl);
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  // ====================  get all data =================

  useEffect(() => {
    categories();
  }, []);

  const categories = () => {
    viewCategoryService()
      .then((res) => {
        console.log(res);
        setCategoryData(res.data.data);
      })
      .catch(function (error) {});
  };

  //  ================= add categrory =============
  const onSubmit = (data) => {
    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category[0]);
    category(formData)
      .then(function (res) {
        handleClose();
        toast.success("Category Added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        categories();
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

  // ===================== get api in modal ================

  const handleEdit = (rowId, rowName) => {
    handleShow1();
    reset();
    // Getting Data for Specific category
    viewCategorybyId(rowId)
      .then(function (response) {
        setCatId(response.data.data.id);
        setValue("name", response.data.data.name);
        setCatFile(
          `http://13.213.151.153:8081/${response.data.data.MediaObjects[0].imageUrl}`
        );
        setValue(
          "category",
          `http://13.213.151.153:8081/${response.data.data.MediaObjects[0].imageUrl}`
        );
      })
      .catch(function (error) {});
  };

  // =================== edit category modal ==================

  // ================== upload category file ========================
  const handleChange = (e) => {
    if (e?.target?.files?.length) {
      setImage({
        preview: URL.createObjectURL(e?.target?.files[0]),
        raw: e?.target?.files[0],
      });
    }
  };

  const EditSubmit = async (e) => {
    var formData2 = new FormData();
    formData2.append("name", e.name);
    formData2.append("id", catId);
    formData2.append("category", image.raw);
    editCategoryFun(formData2)
      .then((res) => {
        if (res.statusText === "OK") {
          categories();
          handleClose1();
          toast.info("Category Edited Successfully", {
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

  // ========================= delete api =================
  // function confirmDelete(rowId) {
  //   const deleteById = {
  //     id: rowId,
  //   };
  //   deleteCategoryService(deleteById)
  //     .then(function (res) {
  //       toast.success(res.data.data, {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: false,
  //         progress: 0,
  //         toastId: "my_toast",
  //       });
  //       categories();
  //     })
  //     .catch(function (error) {
  //       toast.error("Category is added to a recipe so it cannot be deleted", {
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
  // }

  // function handleDelete(rowId, name) {
  //   confirmAlert({
  //     title: "Delete",
  //     message: `Are you sure you want to remove this item from the table?`,
  //     buttons: [
  //       {
  //         label: "Yes",
  //         className: "btn btn-danger",
  //         onClick: () => {
  //           confirmDelete(rowId);
  //         },
  //       },
  //       {
  //         label: "No",
  //       },
  //     ],
  //   });
  // }

  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 justify-content-between">
        <div className="page-heading-wapper d-flex">
          <BagIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Categories </h3>
        </div>

        <div className="d-flex align-items-center my-4">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleShow}
          >
            {" "}
            <AddIcon /> Add New Categories
          </button>
        </div>
      </div>
      {/* Modal for Adding New Category */}
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
              <Form.Label>Cuisine name</Form.Label>
              <Form.Control
                type="text"
                placeholder="cuisine"
                autoComplete="off"
                {...register("name", {
                  required: "Cuisine is required!",
                })}
              />
            </Form.Group>
            {errors.name && <p className="errors">{errors.name.message}</p>}
            <Form.Group className="mt-3">
              <Form.Label>Category image</Form.Label>
              <Form.Control
                type="file"
                id="formFile"
                {...register("category", {
                  required: "Please provide an image!",
                })}
              />
            </Form.Group>
            {errors.category && (
              <p className="errors">{errors.category.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Categories
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {isOpen === true ? (
        <Lightbox mainSrc={categImg} onCloseRequest={() => setOpen(false)} />
      ) : null}

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
              <Form.Label>Cuisine name</Form.Label>
              <Form.Control
                type="text"
                placeholder="cuisine"
                autoComplete="off"
                {...register("name", {
                  required: "Cuisine is required!",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets are allowed!",
                  },
                  minLength: {
                    value: 4,
                    message: "Must be greater than 4 words!",
                  },
                })}
              />
            </Form.Group>
            {errors.name && <p className="errors">{errors.name.message}</p>}
            <Form.Group className="mt-3">
              <Form.Label>Category image</Form.Label>
              <div className="profile-pic-wrapper">
                <div className="profile-pic-holder">
                  <label htmlFor="upload-button">
                    {image.preview ? (
                      <img
                        src={image.preview}
                        id="profilePic"
                        className="pic"
                        alt="user_image"
                        {...register("category", {})}
                      />
                    ) : (
                      <img
                        id="profilePic"
                        className="pic"
                        alt="user_image"
                        src={catFile}
                        {...register("category", {})}
                      />
                    )}
                  </label>
                  <label htmlFor="upload-button" className="upload-file-block">
                    <div className="text-center">
                      <div className="mb-2"></div>
                      <div className="text-uppercase">
                        Update <br /> Profile Photo
                      </div>
                    </div>
                  </label>
                  <Input
                    className="uploadProfileInput d-none"
                    type="file"
                    name="profile_pic"
                    id="upload-button"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Form.Group>
            {errors.category && (
              <p className="errors">{errors.category.message}</p>
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
              custom: false,
              totalSize: categoryData.length,
              prePageText: "Previous",
              withFirstAndLast: false,
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
                  value: categoryData.length,
                },
              ],
              hideSizePerPage: categoryData.length === 0,
            })}
            keyField="id"
            columns={columns}
            data={categoryData}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={categoryData}
                search
              >
                {(toolkitprops) => (
                  <>
                    <div className="d-flex justify-content-end mb-3">
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
                      data={categoryData}
                      condensed={false}
                      noDataIndication="No Data Is Available"
                      bootstrap4
                    />
                    {/* <div className="d-flex justify-content-end">
                      <PaginationListStandalone {...paginationProps} />
                    </div> */}
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

export default CategoriesTable;
