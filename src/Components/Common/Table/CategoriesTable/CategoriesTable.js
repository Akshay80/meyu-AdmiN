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
  setCategoryPriority,
} from "../../../../Services/categoryService";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Input } from "reactstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import $ from "jquery";
import jQuery from "jquery";
import Loader from "../../../../Assets/Icon/loading.gif";

const CategoriesTable = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [categImg, setCategImg] = useState();
  const [catId, setCatId] = useState();
  const [catFile, setCatFile] = useState();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset();
    setShow(true);
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [searchValue, setSearchValue] = useState("");
  const { SearchBar } = Search;
  const headerSortingStyle = { backgroundColor: "#e3edf8" };
  const [loading, setLoading] = useState(false);

  const url = "http://13.213.151.153:8083/";
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const columns = [
  //   {
  //     dataField: "sl no.",
  //     text: "Serial No",
  //     headerSortingStyle,
  //     // headerAlign: "center",
  //     // align: "center",
  //     formatter: (cell, row, rowIndex, formatExtraData) => {
  //       return rowIndex + 1;
  //     },
  //   },
  //   {
  //     dataField: "imageUrl",
  //     text: "Image",
  //     headerSortingStyle,
  //     // headerAlign: "center",
  //     // align: "center",
  //     formatter: (rowContent, row) => {
  //       return (
  //         <div className="d-flex">
  //           {row.MediaObjects.map((rows, key) => (
  //             <input
  //               key={key}
  //               type="image"
  //               className="categoryImages"
  //               src={url + rows.imageUrl}
  //               alt="food_image"
  //               onClick={() => openLightbox(rows.imageUrl)}
  //             />
  //           ))}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     dataField: "name",
  //     text: "Cuisine",
  //     headerSortingStyle,
  //     sort: true,
  //     // headerAlign: "center",
  //     // align: "center",
  //   },

  //   {
  //     dataField: "link",
  //     text: "Action",
  //     // headerAlign: "center",
  //     // align: "center",
  //     formatter: (rowContent, row) => {
  //       return (
  //         <div className="d-flex">
  //           <EditIcon
  //             className="edit-icon"
  //             onClick={() => handleEdit(row.id, row.name)}
  //           />
  //           {/* <DeleteIcon
  //             className="iconHover delete-icon"
  //             onClick={() => handleDelete(row.id, row.name)}
  //           /> */}
  //         </div>
  //       );
  //     },
  //   },
  // ];

  async function openLightbox(MyUrl) {
    setOpen(true);
    await setCategImg(url + MyUrl);
  }

  // const defaultSorted = [
  //   {
  //     dataField: "id",
  //     order: "asc",
  //   },
  // ];

  // ====================  get all data =================

  useEffect(() => {
    categories();
    // let search = document.getElementById("searchTxt");

    // if (search) {
    //   search.addEventListener("input", function () {
    //     let inputVal = search.value;

    //     // console.log('Input event fired!', inputVal);

    //     var noteCards = document.getElementsByClassName("cateItem");
    //     console.log(noteCards.length)

    //     Array.from(noteCards).forEach(function (element) {
    //       document.getElementById("message").innerHTML = "";
    //       var cardTxt = element.getElementsByTagName("p")[0].innerHTML;
    //       if (cardTxt.includes(inputVal)) {
    //         console.log('include');
    //         document.getElementById("message").innerHTML = "";
    //         element.style.display = "revert";
    //       } else if(noteCards.length){
    //         console.log('not include');
    //         document.getElementById("message").innerHTML = "No Data Is Available";
    //         element.style.display = "none";
    //       }
    //       // if (cardTxt.includes(inputVal) === true) {
    //       //   console.log(cardTxt.includes(inputVal));
    //       // } else {
    //       //   console.log(cardTxt.includes(inputVal));
    //       // }
    //     });
    //   });
    // }
  }, []);

  const categories = () => {
    setLoading(true);
    setTimeout(() => {
      viewCategoryService()
      .then((res) => {
        setLoading(false);
        setCategoryData(res.data.data);
      })
      .catch(function (error) {});  
    }, 1000);
    
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
          `http://13.213.151.153:8083/${response.data.data.MediaObjects[0].imageUrl}`
        );
        setValue(
          "category",
          `http://13.213.151.153:8083/${response.data.data.MediaObjects[0].imageUrl}`
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

  const handleDragEnd = (results) => {
    if (!results.destination) return;
    //POST API For Setting Categories Priority
    const param = {
      priorityIndex: results.destination.index,
      id: results.draggableId,
    };
    setCategoryPriority(param)
      .then(function (res) {
        toast.success(res.data.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        categories();
      })
      .catch(function (error) {
        toast.error("Priority not changed!", {
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
  // let filter = document.getElementById("myInput").value.toUpperCase();
  // let myTable = document.getElementById("myTable");
  // let tr = myTable.getElementsByTagName("tr");

  // for (var i = 0; i < tr.length; i++) {

  //   let td = tr[i].getElementsByTagName("td")[1];

  //   if (td) {
  //     let textvalue = td.textContent || td.innerHTML;
  //     setMessage("");
  //     if (textvalue.toUpperCase().indexOf(filter) > -1) {

  //       tr[i].style.display = "revert";
  //     } else {
  //       tr[i].style.display = "none";
  //       setMessage("No data available")
  //     }
  //   }
  // }

  $(document).ready(function () {
    (function ($) {
      $("#filter").keyup(function () {
        var rex = new RegExp($(this).val(), "i");
        $(".searchable tr").hide();
        $(".searchable tr")
          .filter(function () {
            return rex.test($(this).text());
          })
          .show();
        $(".no-data").hide();
        if ($(".searchable tr:visible").length == 0) {
          $(".no-data").show();
        }
      });
    })(jQuery);
  });

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
                  // pattern: {
                  //   value: /^[A-Za-z]+$/,
                  //   message: "Only alphabets are allowed!",
                  // },
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

      <div className="card mb-5">
        <div
          className="table-responsive"
          style={{ padding: "20px", height: 450, overflowY: "scroll" }}
        >
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div className="position-relative ms-auto">
              {" "}
              <span className="position-absolute search">
                <i className="fab fa-search"></i>
              </span>{" "}
              <input
                className="form-control w-100"
                placeholder="Search"
                aria-label="search"
                // id="searchTxt"
                // id="myInput"
                id="filter"
                // onKeyUp={searchFunction}
              />{" "}
            </div>
          </div>
          <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
            <table className="table table-bordered table-striped" id="myTable">
              <thead>
                <tr>
                  <th scope="col">Serial No.</th>
                  <th scope="col">Image</th>
                  <th scope="col">Cuisine Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <Droppable droppableId="tbody">
                {(provided) => (
                  <tbody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="searchable"
                  >
                    <tr className="no-data">
                      <td colspan="4">No Data Is Available</td>
                    </tr>
                    {loading && (
                      <tr className="text-center" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                        <td colspan="4"><img src={Loader} alt="loader" width={25}/></td>
                    </tr>
                    )}
                    
                    {categoryData.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.name}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={index}
                            // className="cateItem"
                          >
                            <th scope="row">{index + 1}</th>
                            <td>
                              <img
                                alt="categoryImages"
                                src={`http://13.213.151.153:8083/${item.MediaObjects.map(
                                  (element) => element.imageUrl
                                )}`}
                                style={{
                                  borderRadius: "50%",
                                  height: 100,
                                  width: 100,
                                  objectFit: "cover",
                                }}
                                onClick={() =>
                                  openLightbox(
                                    item.MediaObjects.map(
                                      (element) => element.imageUrl
                                    )
                                  )
                                }
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <EditIcon
                                className="edit-icon"
                                onClick={() => handleEdit(item.id)}
                              />
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                  </tbody>
                )}
              </Droppable>
            </table>
            <p id="message" className="text-center">
              {message}
            </p>
          </DragDropContext>
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
