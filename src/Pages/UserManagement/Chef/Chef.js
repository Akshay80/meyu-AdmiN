import React from 'react'
import ChefTable from '../../../Components/Common/Table/ChefTable/ChefTable'
import {ReactComponent as UserIcon} from '../../../Assets/Icon/user.svg'
import {ReactComponent as MenuIcon} from '../../../Assets/Icon/Menu.svg'
import ChefOrderTable from '../../../Components/Common/Table/ChefOrderTable/ChefOrderTable'

const Chef = () => {
    return (
        <div>
            <div className="page-heading d-flex align-items-center p-3">
        <UserIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Chef </h3>
      </div>
      <div className="card">
           <ChefTable />
        </div>
           <div>
        <p>This needs to be Shift at view Icon Order Detail table.</p>
        <div className="page-heading d-flex align-items-center p-3">
        <MenuIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Order Details </h3>
      </div>
      <div className="card">
        <ChefOrderTable />
        </div>
        </div>
        </div>
    )
}

export default Chef
