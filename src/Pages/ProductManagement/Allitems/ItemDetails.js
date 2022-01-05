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
import { toast } from "react-toastify";

const ItemDetails = ({ itemDetail, itemImage, itemStatus }) => {
  const [togglemenu, setToggleMenu] = useState(false);
  const [status, setStatus] = useState();
  // const [itemStatus, setItemStatus] = useState(false);
  const animatedComponents = makeAnimated();
  const toggleMenu = () => {
    setToggleMenu(true);
  };

  // handle selection
  const options = [
    { value: itemStatus === "true", label: "Approved" },
    { value: itemStatus === "false", label: "Pending" },
  ];

  const changeStatus = (data) => {
    // setItemStatus(itemStatus ? false : true);
    let params = {
      isVerified: "true",
    };
    confirmItemsbyId(params)
      .then((data) => {
        console.log("cheff acount", data);
        if (data.statusText === "OK") {
          setStatus(data.statusText);
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

  return (
    <div className="card p-5 m-3">
      <div className="pb-5">
        <div className="profile-pic-wrapper pb-2">
          <div className="pic-holder">
            <img
              id="itemPic"
              className="item-pic"
              alt="Image"
              src={itemImage === null ? UserImage : itemImage}
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
              <Select
                // defaultValue={status}
                options={options}
                onChange={changeStatus}
              ></Select>
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
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridTags"
            >
              <Form.Label className="mb-1">Tags</Form.Label>
              <Form.Control defaultValue={itemDetail?.tags}></Form.Control>

              {/* <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti={true}
                Value={itemDetail?.tags}
                options={itemDetail?.tags}
                onChange={(e) => console.log(e.map((item) => item.label))}
              /> */}
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
              <Form.Control
                value={itemDetail?.totalCostOfRecipe}
                type="number"
              />
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
