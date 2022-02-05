import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import "../../../Components/Common/Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UserImage from "../../../Assets/Images/blank-user.png";
import {
  confirmItemsbyId,
  updateRecipebyId,
  updateRecipeImagebyId
} from "../../../Services/itemsService";
import { toast } from "react-toastify";
import { getAllTagFun } from "../../../Services/tagServices";
import { getItemsbyId } from "../../../Services/itemsService";
import { useParams } from "react-router";

const ItemDetails = ({
  itemDetail,
  itemImage,
  itemStatus,
  selectedTag,
  category,
}) => {
  const [tagOption, setTagOption] = useState([]);
  const [tag, setTag] = useState([]);
  const [err, setError] = useState("");
  const [paramss, setParams] = useState();
  const [image, setImage] = useState({ preview: "", raw: "" });

  const { itemId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // change status of Item/Recipe
  const changeStatus = (value) => {
    setParams({
      isVerified: value,
    });
  };
  // set Tags Options
  useEffect(() => {
    tagdata();
    fetchItemDetail();
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

  const fetchItemDetail = () => {
    getItemsbyId(itemId)
      .then((response) => {
        if (response.statusText === "OK") {
          setValue("categoryId", response.data.data.recipeDetails.categoryId);
          setValue("dishName", response.data.data.recipeDetails.dishName);
          setValue("deliveryFee", 22);
          setValue(
            "preparationTime",
            response.data.data.recipeDetails.preparationTime
          );
          setValue("description", response.data.data.recipeDetails.description);
          setValue(
            "isVegetarian",
            response.data.data.recipeDetails.isVegetarian ? 1 : 0
          );
          setValue(
            "isNonVegetarian",
            response.data.data.recipeDetails.isNonVegetarian ? 1 : 0
          );
          setValue(
            "costPerServing",
            response.data.data.recipeDetails.costPerServing
          );

          // set item image
          // response?.data?.data?.recipeDetails?.MediaObjects?.map((recipe) =>
          //   setItemImage(`http://meyu.sg:8082/${recipe?.imageUrl}`)
          // );

          // set chef image
          // setChefImage(
          //   `http://meyu.sg:8082/${response?.data?.data?.profile?.profileUrl}`
          // );

          // response?.data?.data?.profile?.MediaObjects?.map((chefPic) =>
          //   setChefImage(`http://meyu.sg:8082/${chefPic?.imageUrl}`)
          // );
          // ===========================
          //  set Tags Data
          let tempTag = [];
          response?.data?.data?.recipeDetails?.tags?.forEach(
            (tagName, index) => {
              let tempTagObj = {
                value: tagName[index],
                label: tagName[index],
              };
              tempTag.push(tempTagObj);
            }
          );
          // setSelectedTag(tempTag);
        }
      })
      .catch(function (error) {});
  };

  const submitdata = (data) => {
    var formData = new FormData();
    formData.append("dishName", data.dishName);
    formData.append("tags", data.tags);
    formData.append("preparationTime", data.preparationTime);
    formData.append("categoryId", data.categoryId);
    formData.append("deliveryFee", data.deliveryFee);
    formData.append("costPerServing", data.costPerServing);
    formData.append("description", data.description);
    formData.append("isVegetarian", data.isVegetarian);
    formData.append("isNonVegetarian", data.isNonVegetarian);
    formData.append("sellingPrice", data.sellingPrice);

    console.log("form ka data : ", formData);
    // Selling Price Part
    if (Math.floor(itemDetail.costPerServing) < data.sellingPrice) {
      setError("");

      // Update Recipe By ID
      updateRecipebyId(itemDetail?.id, formData)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.data.message, {
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
        .catch((err) => {
          console.log(err);
        });

      //  Change Status Approved or Pending
      confirmItemsbyId(itemDetail.id, paramss)
        .then((data) => {})
        .catch((error) => {});
    } else {
      setError("Selling Price must be greater than Chef Price!");
    }
  };


  // Upload Reciepe Image by ID

  const handleChange = (e) => {
    if (e?.target?.files?.length) {
      setImage({
        preview: URL.createObjectURL(e?.target?.files[0]),
        raw: e?.target?.files[0],
      });
    }

    let formData = new FormData();
    formData.append("recipe", e?.target?.files[0]);
    updateRecipeImagebyId(itemDetail?.id, formData)
      .then((response) => {
        if (response.data.success === true) {
          toast.success(response.data.data.message, {
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

  const animatedComponents = makeAnimated();
  return (
    <div className="card p-5 m-3">
      <div className="pb-5">
        <div className="profile-pic-wrapper pb-2">
          <div className="pic-holder pb-2">
            <img
               src={itemImage ? itemImage : image.preview}
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
             onChange={handleChange}
          />
        </div>
          </div>

      <form className="profile-form mt-3" onSubmit={handleSubmit(submitdata)}>
        <div className="row mb-3">
          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom002" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              onChange={(e) => changeStatus(e.target.value)}
            >
              {itemStatus === true ? (
                <option value="true">Approved</option>
              ) : (
                <option value="false">Pending</option>
              )}
              <option value={itemStatus === false ? "true" : "false"}>
                {itemStatus === false ? "Approved" : "Pending"}
              </option>
            </select>
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom002" className="form-label">
              Product ID
            </label>
            <input
              type="text"
              value={itemDetail?.id}
              className="form-control"
              disabled
            />
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              onChange={(e) => console.log(e.target.value)}
              {...register("dishName", {
                required: "Product name is required!",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Invalid Product Name",
                },
              })}
              className="form-control"
            />
            {errors.dishName ? (
              <p className="errors">{errors.dishName.message}</p>
            ) : null}
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom0655" className="form-label">
              Category
            </label>
            <input
              type="text"
              value={itemDetail?.Category?.name}
              className="form-control"
              disabled
            />
          </div>

          {/* =============================== tagss multiple ============ */}
          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom004" className="form-label">
              Tags (Optional)
            </label>
            {selectedTag.length ? (
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={selectedTag}
                placeholder="If not Selected, then previous tags will go on!"
                isMulti
                options={tagOption}
                isSearchable
                required={true}
                onChange={(e) => setTag(e.map((val) => `${val.label}`))}
                {...setValue(
                  "tags",
                  tag.length === 0
                    ? selectedTag.map((val) => `${val.label}`)
                    : tag
                )}
              />
            ) : (
              "" 
            )}
          </div>
          {/* ======================================== */}
          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
              Preparation Time
            </label>
            <input
              type="text"
              className="form-control"
              {...register("preparationTime", {
                required: "Preparation time is required!",
              })}
            />
            {errors.preparationTime ? (
              <p className="errors">{errors.preparationTime.message}</p>
            ) : null}
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
              Chef Price
            </label>
            <input
              type="text"
              {...register("costPerServing")}
              className="form-control"
              disabled
            />
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
            <label htmlFor="validationCustom001" className="form-label">
              Selling Price
            </label>
            <input
              type="text"
              {...register("sellingPrice", {
                required: "Selling Price is required" || err,
                pattern: {
                  value: /^[1-9]\d*(\.\d+)?$/,
                  message: "Invalid Selling Price",
                },
              })}
              className="form-control"
            />
            {errors.sellingPrice ? (
              <p className="errors">{errors.sellingPrice.message}</p>
            ) : (
              <p className="errors">{err}</p>
            )}
          </div>

          <div className="d-flex flex-column w-100 flex-direction-column pb-2 align-items-start">
            <label>Description</label>
            <textarea
              rows="4"
              className="text-area mx-1 form-control w-100 h-100"
              placeholder="About Product"
              id="floatingTextarea2"
              {...register("description", {
                required: "Description is required!",
              })}
            ></textarea>
            {errors.description ? (
              <p className="errors">{errors.description.message}</p>
            ) : null}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-success px-5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemDetails;
