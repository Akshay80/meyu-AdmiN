import React from 'react'
import {ReactComponent as TotalOrder} from '../../../../Assets/Icon/totalOrder.svg'
import {ReactComponent as TotalDelivered} from '../../../../Assets/Icon/orderDelivered.svg'
import {ReactComponent as TotalCancelled} from '../../../../Assets/Icon/orderCancelled.svg'
import {ReactComponent as TotalRevenue} from '../../../../Assets/Icon/Revenue.svg'
import Path from '../../../../Constant/RouterConstant'

export const DashboardCardData = [
    {
        title: "Total Orders",
        icon: <TotalOrder /> ,
        // link: Path.totalOrders,
        number: "80"
    },  
    {
        title: "Total Delivered",
        icon: <TotalDelivered/> ,
        // link: Path.totalDelivered,
        number: "75"
    },
    {
        title: "Total Cancelled",
        icon: <TotalCancelled /> ,
        // link: Path.totalCancelled,
        number: "5"
    },
    {
        title: "Total Revenue",
        icon: <TotalRevenue /> ,
        // link: Path.totalRevenue,
        number: "2000"
    },
]