import React from "react";
import PrimaryCard from "../../../Components/Common/Cards/PrimaryCard/PrimaryCard";
import { ReactComponent as UserIcon} from '../../../Assets/Icon/user.svg'
import OrderDetailCard from "../../../Components/Common/Cards/OrderDetailCard/OrderDetailCard";

const Customer = () => {
  return (
    <div>
      <div className="page-heading d-flex justify-content-between align-items-center p-4">
        <div className="d-flex">
          <UserIcon
            style={{ height: "36px", width: "36px", marginRight: "10px" }}
          />
          <h3 className="m-1">Customer / Customer-Details </h3>
        </div>
      </div>
        <PrimaryCard />
        <OrderDetailCard />
    </div>
  );
};

export default Customer;
