import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import "../../../Components/Common/Buttons/buttons.scss";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import UserImage from "../../../Assets/Images/blank-user.png";
import {
  confirmItemsbyId,
  updateRecipebyId,
  updateRecipeImagebyId,
} from "../../../Services/itemsService";
import { toast } from "react-toastify";
import { getAllTagFun } from "../../../Services/tagServices";
import {
  getItemsbyId,
  deleteRecipeImagebyId,
} from "../../../Services/itemsService";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./ItemDetails.scss";
import { ReactComponent as CloseIcon } from "../../../Assets/Icon/close.svg";
const ItemDetails = ({ itemImage, itemStatus, mediaObjectId }) => {
  const [tagOption, setTagOption] = useState([]);
  const [tag, setTag] = useState([]);
  const [err, setError] = useState("");
  const [paramss, setParams] = useState();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [tasveer, setTasveer] = useState();
  // const [recipeImage, setRecipeImage] = useState("");
  // const [recipeImageByAPI, setRecipeImagebyAPI] = useState();
  // const [multi, setMulti] = useState([]);
  // const [image, setImage] = useState({});
  const [pics, setPics] = useState([]);
  const [items, setItems] = useState();
  // const [chef, setChef] = useState();
  const [catname, setCatName] = useState();
  const [time, setTime] = useState();
  const [selectedTag, setSelectedTag] = useState([]);
  const [itemDetail, setItemDetail] = useState({});
  const [status, setStatus] = useState(false);

  let navigate = useNavigate();
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
    fetchItemDetail();
    tagdata();
    // setOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setItems(response.data.data.recipeDetails);
        setCatName(response.data.data.recipeDetails.Category.name);
        setTime(response.data.data.recipeDetails.preparationTime);
        // setChef(response.data.data.profile);
        setItemDetail(response?.data?.data?.recipeDetails);
        setValue("categoryId", response.data.data.recipeDetails.categoryId);
        setValue("dishName", response.data.data.recipeDetails.dishName);
        setValue("deliveryFee", 22);
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

        setValue("sellingPrice", response.data.data.recipeDetails.sellingPrice);

        // response?.data?.data?.profile?.MediaObjects?.map((chefPic) =>
        //   setChefImage(`http://meyu.sg:8082/${chefPic?.imageUrl}`)
        // );
        setPics(response.data.data.recipeDetails.MediaObjects);
        response?.data?.data?.recipeDetails?.MediaObjects?.map(
          (img) => `http://13.213.151.153:8081/${img?.imageUrl}`
        );

        // response.data.data.recipeDetails.MediaObjects.map((url, index) => setImage({
        //   [index]:`http://13.213.151.153:8081/${url.imageUrl}`
        // }))
        // ===========================
        //  set Tags Data
        let tempTag = [];
        response?.data?.data?.recipeDetails?.tags?.forEach((tagName, index) => {
          let tempTagObj = {
            value: tagName[index],
            label: tagName[index],
          };
          tempTag.push(tempTagObj);
        });
        setSelectedTag(tempTag);
      })
      .catch(function (error) {});
  };

  const submitdata = (data) => {
    console.log(data);
    // Selling Price Part
    if (Math.floor(itemDetail.costPerServing) <= data.sellingPrice) {
      setError("");
      console.log("cost price: ", data.sellingPrice);

      var mytags = data.tags;
      var t = mytags
        .map((s) => `${s}`)
        .join(",")
        .replace(/["']/g, '"');
      var tag = ("tags : ", "[" + t + "]".toString());
      console.log(tag);

      var formData = new FormData();
      formData.append("dishName", data.dishName);
      formData.append("tags", tag);
      formData.append("preparationTime", time);
      formData.append("categoryId", data.categoryId);
      formData.append("deliveryFee", data.deliveryFee);
      formData.append("costPerServing", data.costPerServing);
      formData.append("description", data.description);
      formData.append("isVegetarian", data.isVegetarian);
      formData.append("isNonVegetarian", data.isNonVegetarian);
      formData.append("sellingPrice", data.sellingPrice);

      // var test = [];
      // for(var i=0;i<data.tags.length;i++){
      //   var ans=mytags[i].replace(/'/g,'"')
      //   var pushedArray = test.push(ans)
      //   console.log("Pushed ARRAY : ",pushedArray);
      //  }

      console.log("ID SURAJ: ", itemDetail.id);
      // Update Recipe By ID
      updateRecipebyId(itemDetail.id, formData)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.data.message, {
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
          // fetchItemDetail();
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        })

        .catch((err) => {
          console.log(err);
        });

      //  Change Status Approved or Pending
      if (status === true) {
        console.log("Did Changed Status API");
        confirmItemsbyId(itemDetail.id, paramss)
          .then((data) => {
            console.log(data.data);
          })
          .catch((error) => {});
      }
    } else {
      setError("Selling Price must be greater than Chef Price!");
    }

    // console.log(tasveer)

    let formData1 = new FormData();
    formData1.append("recipe", tasveer);
    updateRecipeImagebyId(mediaObjectId, formData1)
      .then((response) => {
        // if (response.data.success === true) {
        //   toast.success(response.data.data.message, {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: false,
        //     progress: 0,
        //     toastId: "my_toast",
        //   });
        // }
        // window.location.reload(false);
        // setRecipeImage(
        //   `http://13.213.151.153:8081/${response.data.data.profileUrl}`
        // );
      })
      .catch((error) => {
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

    fetchItemDetail();
  };

  // OnClose Function
  const handleClose = async (image) => {
    // // Selected Image Object
    // console.log(id);
    // // All Images Object
    // console.log(multi);
    setPics((oldState) => oldState.filter((item) => item.id !== image.id));

    // Delete Recipe Image By Media Object ID
    deleteRecipeImagebyId(image.id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // Upload Reciepe Image by ID

  const handleChange = (e) => {
    if (e?.target?.files?.length) {
      setImage({
        preview: URL.createObjectURL(e?.target?.files[0]),
        raw: e?.target?.files[0],
      });
    }
    setTasveer(e.target.files[0]);
  };

  const animatedComponents = makeAnimated();

  var objB = selectedTag.reduce(
    (tagOption, c) => tagOption.add(c.label),
    new Set()
  );
  var result = tagOption.filter((v) => !objB.has(v.label));

  return (
    <div className="card p-5 m-3">
      <div className="pb-3">
        <div className="container">
          <div className="row">
            {/* {console.log(pics)} */}
            {pics.map((images) => (
              <div
                key={images.id}
                className={
                  pics.length === 1
                    ? "col-sm-12 col-md-6 mx-auto mb-3 h-100"
                    : "col-sm-12 col-md-4 mb-3"
                }
              >
                <div className="text-end" style={{ margin: 35 }}>
                  {pics.length !== 1 ? (
                    <CloseIcon
                      className="btn-close-color"
                      style={{ position: "absolute", marginTop: 7 }}
                      onClick={() => handleClose(images)}
                    />
                  ) : null}
                </div>
                <input
                  type="image"
                  key={images.id}
                  src={
                    image.preview === ""
                      ? `http://13.213.151.153:8081/` + images.imageUrl
                      : image.preview
                  }
                  style={{ width: "100%" }}
                  height="300"
                  alt=""
                  defaultValue={`http://13.213.151.153:8081/` + images.imageUrl}
                />
              </div>
            ))}

            {/* </div> */}
            <div className="text-center">
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
              onChange={(e) => {
                changeStatus(e.target.value);
                setStatus(true);
              }}
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
              value={items?.id}
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
              value={catname}
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
                options={result}
                isSearchable
                required={true}
                onChange={(e) =>
                  setTag(e.map((val) => JSON.stringify(val.label)))
                }
                // onChange={(e) => {e.map((VAL) => console.log(VAL.label))}}
                {...setValue(
                  "tags",
                  tag.length === 0
                    ? selectedTag.map((val) => JSON.stringify(val.label))
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
            <input type="text" className="form-control" value={time} disabled />
          </div>

          <div className="col-md-12 col-sm-12 col-xs-12 mb-3">
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

          {/* <div className="col-md-6 col-sm-6 col-xs-12 mb-3">
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
          </div> */}

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
