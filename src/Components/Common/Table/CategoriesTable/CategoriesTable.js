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
import "./CategoryTable.css";
import { confirmAlert } from "react-confirm-alert";
import { ReactComponent as BagIcon } from "../../../../Assets/Icon/Shoppingbasket.svg";
import { ReactComponent as AddIcon } from "../../../../Assets/Icon/Add.svg";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useForm } from "react-hook-form";
import { viewCategoryService , deleteCategoryService } from "../../../../Services/userService";
import { } from "../../../../Services/userService";
import { category, viewCategorybyId } from "../../../../Services/categoryService";
import Path from "../../../../Constant/RouterConstant";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Form, FormControl } from "react-bootstrap";

let toastId = null;

const CategoriesTable = () => {
  const [categoryy, setCat] = useState();
  const [subCategoryy, setSubCat] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [image, setImage] = useState([]);
  const [editImage, setEditImage] = useState([]);
  const [catImage, setCatImage] = useState();
  const [product, setProducts] = useState([]);
  const [formData, setFormData] = useState();
  
  
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const id = useParams();

  
  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };

  const url = "http://52.77.236.78:8081/";
  let toastId = null;
  const navigate = useNavigate();
  const {
    register,
    setValue,
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
    // {
    //   dataField: "id",
    //   text: "Serial No",
    //   sort: true,
    //   headerSortingStyle,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      dataField: "imageUrl",
      text: "Categories Image",
      sort: true,
      headerSortingStyle,
      headerAlign: "center",
      align: "center",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex align-items-center justify-content-evenly">
            {row.MediaObjects.map((rows) => (
              <img
                className="categoryImages"
                src={url + rows.imageUrl}
                alt="food_image"
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
            <EditIcon className="edit-icon mt-1" onClick={() => handleEdit(row.id, row.name)}/>
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

  useEffect(() => {
    categories();
  }, []);



  async function categories() {
    await viewCategoryService()
      .then(function (res) {
        res.data.data.map((items) =>
          items.MediaObjects.map((item) => setImage(item.imageUrl))
        );
        setCategoryData(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  var products = categoryData.map((custom) => [
    {
      id: custom.id,
      name: custom.name,
    },
  ]);

  const onSubmit = (data) => {
    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category[0]);
    setFormData({ name: data.name, category: data.category[0]});
    category(formData)
      .then(function (res) {
        console.log(res);
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
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      })
      
      .catch(function (error) {
        console.log(error);
      });
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
            confirmDelete(rowId);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  async function handleEdit(rowId, rowName) {
    console.log(rowId)
    localStorage.setItem("catID", rowId)
    handleShow1(rowId);
// Getting Data for Specific category
    await viewCategorybyId(id(rowId))
    .then(function (response) {
    console.log(response.data.data);
    response.data.data.map((items) =>
    items.MediaObjects.map((item) => setEditImage(item.imageUrl))
  );
    }).catch(function (error) {
      console.log(error);
    })

  }

  function confirmDelete(rowId) {
    const deleteById = {
      id: rowId,
    };
    deleteCategoryService(deleteById)
      .then(function (res) {
        console.log(res.data.data);
        toast.success(res.data.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
            // data-bs-toggle="modal"
            // data-bs-target="#exampleModal"
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

{/* Modal for Edit */}

<Modal
        aria-labelledby="contained-modal-title-vcenter"
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
          <Button variant="success" type="submit">
            Update
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

      <div className="card">
        {/* {products.map(items => items.map((item) => <tr>
          <td>{item.id}</td><td>{item.name}</td><td>{item.imageUrl}</td>
          </tr>)
          )} */}
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
            data={products.map((items) => items.map((item) => item))}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                columns={columns}
                data={products.map((items) => items.map((item) => item))}
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
                      data={categoryData}
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
        autoClose={5000}
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
