import React, { useState, useEffect } from "react";
import ItemChefCard from "./ItemChefCard";
import ItemDetails from "./ItemDetails";
import { useParams } from "react-router";
// import { ToastContainer, toast, Flip } from "react-toastify";
import { ReactComponent as ShoppingCartIcon } from "../../../Assets/Icon/Shoppingbasket.svg";
import { getItemsbyId } from "../../../Services/itemsService";

const EditItems = () => {
  const [itemStatus, setItemStatus] = useState("");
  const [itemDetail, setItemDetail] = useState({});
  const [chefDetail, setChefDetail] = useState({});
  const [selectedTag, setSelectedTag] = useState([]);
  const [itemImage, setItemImage] = useState("");
  const [chefImage, setChefImage] = useState("");
  const { itemId } = useParams();

  useEffect(() => {
    fetchItemDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItemDetail = () => {
    getItemsbyId(itemId)
      .then((response) => {
        if (response.statusText === "OK") {
          setItemStatus(response?.data?.data?.recipeDetails?.isVerified);
          setChefDetail(response?.data?.data?.profile);
          setItemDetail(response?.data?.data?.recipeDetails);

          // set item image
          response?.data?.data?.recipeDetails?.MediaObjects?.map((recipe) =>
            setItemImage(`http://52.77.236.78:8081/${recipe?.imageUrl}`)
          );

          // set chef image
          setChefImage(
            `http://52.77.236.78:8081/${response?.data?.data?.profile?.profileUrl}`
          );

          // response?.data?.data?.profile?.MediaObjects?.map((chefPic) =>
          //   setChefImage(`http://52.77.236.78:8081/${chefPic?.imageUrl}`)
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
          setSelectedTag(tempTag);
        }
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <div className="page-heading d-flex align-items-center justify-content-between p-4">
        <div className="page-heading-wapper align-items-center d-flex">
          <ShoppingCartIcon className="page-icon m-0" />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 mx-2">
              All Items / Item Details{" "}
            </h3>
          </div>
        </div>
        <h6 className="mt-2">
          Chef ID <b>{chefDetail.createdBy}</b>
        </h6>
      </div>

      <div className="d-flex flex-column justify-content-around">
        <ItemChefCard chefDetail={chefDetail} chefImage={chefImage} />
        <ItemDetails
          itemDetail={itemDetail}
          itemImage={itemImage}
          itemStatus={itemStatus}
          selectedTag={selectedTag}
        />
      </div>
    </div>
  );
};

export default EditItems;
