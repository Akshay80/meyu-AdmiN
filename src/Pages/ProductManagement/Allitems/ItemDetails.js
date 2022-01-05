import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import "../../../Components/Common/Buttons/buttons.scss";
import { getAllTagFun } from "../../../Services/tagServices";
import { viewCategoryService } from "../../../Services/userService";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UserImage from "../../../Assets/Images/blank-user.png";
import { confirmItemsbyId } from "../../../Services/itemsService";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

const ItemDetails = ({ itemDetail, itemImage, itemStatus }) => {
  const [togglemenu, setToggleMenu] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [myValue, setmyValue] = useState();
  const [apiValue, setApiValue] = useState(false);
  // const [togglemenu, setToggleMenu] = useState(false);
  const [status, setStatus] = useState();

  const { control } = useForm();
  // handle selection
  const options = [
    { value: itemStatus === true, label: "Approved" },
    { value: itemStatus === false, label: "Rejected" },
  ];

  const changeStatus = (options) => {
    let params = {
      isVerified: options.value ? true : false,
    };
    confirmItemsbyId(itemDetail.id, params)
      .then((data) => {
        console.log("datata", data);
        if (data.statusText === "OK") {
          toast.success(data.data.data.message, {
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
      .catch((error) => {});
  };

  const price = itemDetail.currencySymbol + itemDetail?.totalCostOfRecipe;

  return (
    <div className="card p-5 m-3">
      <div className="pb-5">
        <div className="profile-pic-wrapper pb-2">
          <div className="pic-holder">
            <img
              src={itemImage === null ? UserImage : itemImage}
              id="itemPic"
              className="item-pic"
              alt="Image"
            />
          </div>

          <label htmlFor="newProfilePhoto" className="upload-file-block">
            <div className="text-center">
              <div className="mb-2">
                <i className="fa fa-camera fa-2x"></i>
              </div>
            </div>
            <div className="btn btn-outline-success">Change Image</div>
          </label>
          <Input
            className="uploadProfileInput d-none"
            type="file"
            name="profile_pic"
            id="newProfilePhoto"
            accept="image/*"
          />
        </div>

        <Form className="profile-form mt-3">
          <Row className="mb-3">
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridName"
            >
              <Form.Label className="mb-1">Status</Form.Label>
              {/* <Select
                defaultValue={itemDetail?.isVerified}
                onChange={changeStatus}
                options={options}
              >
                {options?.label}
              </Select> */}
              <Controller
                control={control}
                defaultValue={options.map((a) => a.value)}
                name="options"
                render={({ field: { ref } }) => (
                  <Select
                    inputRef={ref}
                    defaultValue={options.map((a) => a.value)}  
                    onChange={changeStatus}
                    options={options}
                  />
                )}
              />
            </Form.Group>

            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridID"
            >
              <Form.Label className="mb-1">Product ID</Form.Label>
              <Form.Control type="text" value={itemDetail?.id} />
            </Form.Group>
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridProductName"
            >
              <Form.Label className="mb-1">Product Name</Form.Label>
              <Form.Control
                type="text"
                value={itemDetail?.dishName}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridCategory"
            >
              <Form.Label className="mb-1">Category</Form.Label>
              <Form.Control
                defaultValue={itemDetail?.Category?.name}
              ></Form.Control>
            </Form.Group>
            {/* =============================== tagss multiple ============ */}
            {/* {itemDetail?.tags?.map((tags) => { */}
            {/* })} */}
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridTags"
            >
              <Form.Label className="mb-1">Tags</Form.Label>
              <Form.Control defaultValue={itemDetail?.tags}></Form.Control>
            </Form.Group>
            {/* ======================================== */}
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridDelivery"
            >
              <Form.Label className="mb-1">Preparation Time</Form.Label>
              <Form.Control value={itemDetail?.preparationTime} />
            </Form.Group>
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridDate"
            >
              <Form.Label className="mb-1">Price</Form.Label>

              <Form.Control value={price} type="text" />
            </Form.Group>
            <div className="d-flex flex-column w-100 flex-direction-column pb-2 align-items-start">
              <label>Description</label>
              <textarea
                rows="4"
                className="text-area mx-1 form-control w-100 h-100"
                placeholder="About Product"
                value={itemDetail?.description}
                id="floatingTextarea2"
              ></textarea>
            </div>
          </Row>
        </Form>
        <div className="d-flex align-items-center justify-content-center">
          <button className="btn btn-success w-25">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
