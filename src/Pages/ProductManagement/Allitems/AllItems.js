import React from 'react'
import ItemDetails from './ItemDetails'
import {ReactComponent as BagIcon} from '../../../Assets/Icon/Shoppingbasket.svg'
import AllItemsTable from '../../../Components/Common/Table/AllItemsTable/AllItemsTable'

const AllItems = () => {
    return (
        <div>
            <div className="page-heading d-flex align-items-center p-3">
        <BagIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">All items </h3>
      </div>
      <div className="card">
        <AllItemsTable />
      </div>
            <ItemDetails />
        </div>
    )
}

export default AllItems
