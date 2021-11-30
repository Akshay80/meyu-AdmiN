import React from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";

const ChefDetail = ({ menuToggleState }) => {
  return (
    <div>
      <div className="page-heading d-flex justify-content-between flex-column p-4 pb-0">
        <div className="d-flex align-items-center my-2">
          <ChefIcon
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <div className="d-block">
            <h4 className="mb-0">Chef-Details </h4>
            <h6>
              Chef ID <b>#543210</b>
            </h6>
          </div>
        </div>
      </div>
      <ChefCard />
    </div>
  );
};

export default ChefDetail;
