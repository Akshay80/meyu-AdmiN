import React from 'react'
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import CompleteOrderTable from '../../../Components/Common/Table/CompletedOrderTable/CompleteOrderTable';

export default function CompletedOrder() {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 ">
        <div className="page-heading-wapper d-flex">
          <OrderIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Completed Orders</h3>
        </div>
      </div>
      <div className="card m-3 mt-0">
        <CompleteOrderTable />
      </div>
    </>
  );
}