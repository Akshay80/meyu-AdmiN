import React from 'react'
import { ReactComponent as OrderIcon } from "../../../Assets/Icon/order.svg";
import ApprovedOrdersTable from '../../../Components/Common/Table/ApprovedOrderTable/ApporvedOrderTable';


export default function ApprovedOrder() {
  return (
    <>
      <div className="page-heading d-flex align-items-center p-4 ">
        <div className="page-heading-wapper d-flex">
          <OrderIcon className="page-icon m-0" />
          <h3 className="page-sec-heading m-0 mx-2">Approved Orders</h3>
        </div>
      </div>
      <div className="card m-3 mt-0">
        <ApprovedOrdersTable />
      </div>
    </>
  );
}
