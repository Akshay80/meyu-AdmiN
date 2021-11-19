import React from 'react'
import CustomerTable from '../../../Components/Common/Table/CustomerTable/CustomerTable'
import {ReactComponent as UserIcon} from '../../../Assets/Icon/user.svg'

const Customer = () => {
    return (
        <div>
                <div className="page-heading d-flex align-items-center p-3">
        <UserIcon
          style={{ height: "36px", width: "36px", marginRight: "10px" }}
        />
        <h3 className="m-1">Customer </h3>
      </div>
      <div className="card"><CustomerTable /></div>
            
        
        <div>
        <h4>This needs to be Shift at view Icon Order Detail table.</h4>
        </div>
        
        
        </div>
    )
}

export default Customer