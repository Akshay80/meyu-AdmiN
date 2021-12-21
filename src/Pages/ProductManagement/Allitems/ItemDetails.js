import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import "../../../Components/Common/Buttons/buttons.scss";
import { getAllTagFun } from "../../../Services/tagServices";
import { viewCategoryService } from "../../../Services/userService";
import Select from "react-select";
import makeAnimated from "react-select/animated"

const ItemDetails = () => {
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    tagdata();
    categories();
  }, []);

  const tagdata = () => {
    getAllTagFun()
      .then((res) => {
        setTags(res.data.data);
      })
      .catch(function (error) {});
  };

  const categories = () => {
    viewCategoryService()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch(function (error) {});
  };

  let options = tags.map(function (tag) {
    return { value: tag.id, label: tag.name };
  });

  return (
    <div className="card p-5 m-3">
      <div className="pb-5">
        <div className="profile-pic-wrapper pb-2">
          <div className="pic-holder">
            <img
              id="itemPic"
              className="item-pic"
              alt=""
              src="https://source.unsplash.com/random/512x512"
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
              <Form.Select defaultValue="Choose...">
                <option>Approved...</option>
                <option>Pending...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridID"
            >
              <Form.Label className="mb-1">Product ID</Form.Label>
              <Form.Control type="text" placeholder="Product ID" />
            </Form.Group>

            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridProductName"
            >
              <Form.Label className="mb-1">Product Name</Form.Label>
              <Form.Control type="text" placeholder="Product Name" />
            </Form.Group>

            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridCategory"
            >
              <Form.Label className="mb-1">Category</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                onChange={(e) => console.log(e.target.value)}
              >
                {category.map((items) => (
                  <option key={items.id}>{items.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* =============================== tagss multiple ============ */}
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridTags"
            >
              <Form.Label className="mb-1">Tags</Form.Label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti={true}
                options={options}
                onChange={(e) => console.log(e.map((item) => item.label))}
              />
            </Form.Group>
            {/* ======================================== */}

            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridDelivery"
            >
              <Form.Label className="mb-1">Preparation Time</Form.Label>
              <Form.Control placeholder="30 min" />
            </Form.Group>

            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridDate"
            >
              <Form.Label className="mb-1">Price</Form.Label>
              <Form.Control placeholder="Price" type="number" />
            </Form.Group>

            <div className="d-flex flex-column w-100 flex-direction-column pb-2 align-items-start">
              <label>Description</label>
              <textarea
                rows="4"
                className="text-area mx-1 form-control w-100 h-100"
                placeholder="About Product"
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
