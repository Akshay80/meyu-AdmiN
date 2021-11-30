import React from "react";
import ChefCard from "../../../Components/Common/Cards/PrimaryCard/ChefDetailCard/Card";
import { ReactComponent as ChefIcon } from "../../../Assets/Icon/Chef.svg";

const ChefDetail = ({ menuToggleState }) => {
  return (
    <div>
      <div className="page-heading d-flex align-items-center justify-content-between p-4">
        <div className="page-heading-wapper d-flex">
          <ChefIcon className="page-icon m-0" />
          <div className="d-block">
            <h3 className="page-sec-heading m-0 ms-2">Chef-Details </h3>
          </div>
        </div>
        <h6>
          Chef ID <b>#543210</b>
        </h6>
      </div>
      <ChefCard />
    </div>
  );
};

export default ChefDetail;
