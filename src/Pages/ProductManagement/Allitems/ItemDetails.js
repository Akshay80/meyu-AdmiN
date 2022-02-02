import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import "../../../Components/Common/Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UserImage from "../../../Assets/Images/blank-user.png";
import { confirmItemsbyId, updateRecipebyId } from "../../../Services/itemsService";
import { toast } from "react-toastify";
import { getAllTagFun } from "../../../Services/tagServices";

const ItemDetails = ({ itemDetail, itemImage, itemStatus, selectedTag }) => {
  const [tagOption, setTagOption] = useState([]);
  const [err, setError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // change status of Item/Recipe
  const changeStatus = (value) => {
    let params = {
      isVerified: value,
    };
    confirmItemsbyId(itemDetail.id, params)
      .then((data) => {
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
  // set Tags Options
  useEffect(() => {
    tagdata();
  }, []);

  const tagdata = () => {
    getAllTagFun()
      .then((res) => {
        let tempTag = [];
        res?.data?.data?.forEach((tagName) => {
          let tempTagObj = {
            value: tagName.id,
            label: tagName.name,
          };
          tempTag.push(tempTagObj);
        });
        setTagOption(tempTag);
      })
      .catch(function (error) {});
  };

const submitdata = (data) =>
{
  // let params = {
  //   isVerified: value,
  // };
  updateRecipebyId(itemDetail?.id, )
  .then((res) => console.log('Response by ID : ',res))
  .catch((err) => {
  console.log(err);
  })


  // Selling Price Part
  if(Math.floor(itemDetail.costPerServing) < data.sellingPrice)
  {
    setError('');
  }
  else
  {
    setError("Selling Price must be greater than Chef Price!");
  }
}


  const animatedComponents = makeAnimated();
  return (
    
    <div className="card p-5 m-3">
      <div className="pb-5">
        <div className="profile-pic-wrapper pb-2">
          <div className="pic-holder">
            <img
              src={itemImage === null ? UserImage : itemImage}
              id="itemPic"
              className="item-pic"
              alt=""
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

        

        <Form className="profile-form mt-3" onSubmit={handleSubmit(submitdata)}>
          <Row className="mb-3">
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridName"
            >
              <Form.Label className="mb-1">Status</Form.Label>
              <Form.Select onChange={(e) => changeStatus(e.target.value)}>
                {itemStatus === true ? (
                  <option value="true">Approved</option>
                ) : (
                  <option value="false">Pending</option>
                )}
                <option value={itemStatus === false ? "true" : "false"}>
                  {itemStatus === false ? "Approved" : "Pending"}
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridID"
            >
              <Form.Label className="mb-1">Product ID</Form.Label>
              <Form.Control
                type="text"
                readOnly
                defaultValue={itemDetail?.id}
              />
            </Form.Group>
            <Form.Group
              className="col-md-6 col-sm-6 col-xs-12 mb-3"
              controlId="formGridProductName"
            >
              <Form.Label className="mb-1">Product Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={itemDetail?.dishName}
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
              {selectedTag.length ? (
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={selectedTag}
                  isMulti
                  options={tagOption}
                />
              ) : (
                ""
              )}
            </Form.Group>

            {/* ======================================== */}
            <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
            Preparation Time
            </label>
            <input
              type="text"
              value={itemDetail.preparationTime}
              {...register("prepTime", { required: true })}
              className={`form-control ${errors.prepTime ? "is-invalid" : ""}`}
            />

            <div className="invalid-feedback">Preparation time is required!</div>
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
            Chef Price
            </label>
            <input
              type="text"
              value={itemDetail.costPerServing}
              {...register("chefPrice")}
              className={`form-control ${errors.chefPrice ? "is-invalid" : ""}`}
              disabled
            />
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
            Selling Price
            </label>
            <input
              type="text"
              placeholder={itemDetail?.sellingPrice}
              {...register("sellingPrice", {
                required: "Selling Price is required" || err,
              })}
              className="form-control"
              // className={`form-control ${errors.sellingPrice ? "is-invalid" : ""}`}
            />
{errors.sellingPrice?
                      <p className="errors">{errors.sellingPrice.message}</p>
                    :<p className="errors">{err}</p>}
          </div>
           

            <div className="d-flex flex-column w-100 flex-direction-column pb-2 align-items-start">
              <label>Description</label>
              <textarea
                rows="4"
                className="text-area mx-1 form-control w-100 h-100"
                placeholder="About Product"
                defaultValue={itemDetail?.description}
                id="floatingTextarea2"
                {...register("description", { required: true })}
                // className={`text-area mx-1 form-control w-100 h-100 ${errors.description ? "is-invalid" : ""}`}
              ></textarea>
              <div className="invalid-feedback">Description is required!</div>
            </div>
          </Row>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn btn-success px-5">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ItemDetails;
