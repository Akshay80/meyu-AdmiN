import React from 'react';
import CategoriesTable from '../../../Components/Common/Table/CategoriesTable/CategoriesTable';
import {ReactComponent as BagIcon} from '../../../Assets/Icon/Shoppingbasket.svg'

const Categories = () => {
    return (
        <>
        {/* <div className="page-heading d-flex align-items-center p-3">
        <BagIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Categories </h3>
      </div> */}
        <div>
            <CategoriesTable />
        </div>
        </>
    )
}

export default Categories
